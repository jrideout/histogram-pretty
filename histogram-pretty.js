histogram = function(vector,options) {

  options = options || {};
  options.copy = options.copy === undefined ? true : options.copy;
  options.pretty = options.pretty === undefined ? true : options.pretty;

  var s = vector;
  if (options.copy) s = s.slice();
  s.sort(function (a, b) { return a - b; });

  function quantile(p) {
    var idx = 1 + (s.length - 1) * p,
        lo = Math.floor(idx),
        hi = Math.ceil(idx),
        h  = idx - lo;
    return (1-h) * s[lo] + h * s[hi];
  }

  function freedmanDiaconis() {
    var iqr = quantile(0.75) - quantile(0.25);
    return 2 * iqr * Math.pow(s.length,-1/3);
  }

  function pretty(x) {
    var scale = Math.pow(10, Math.floor(Math.log(x/10) / Math.LN10)),
        err   = 10 / x * scale;
    if (err <= 0.15) scale *= 10;
    else if (err <= 0.35) scale *= 5;
    else if (err <= 0.75) scale *= 2;
    return scale * 10;
  }

  var h = freedmanDiaconis();
  if (options.pretty) h = pretty(h);

  function bucket(d) {
    return h * Math.floor(d / h);
  }

  function tickRange(n) {
    var extent  = [bucket(s[0]), h + bucket(s[s.length-1])],
        buckets = Math.round((extent[1] - extent[0]) / h),
        step    = buckets > n ? Math.round(buckets / n) : 1,
        pad     = buckets % step; // to center whole step markings
    return [extent[0] + h * Math.floor(pad/2),
            extent[1] - h * Math.ceil(pad/2) + h*0.5, // pad upper extent for d3.range
            h * step];
  }

  return {
    size: h,
    fun: bucket,
    tickRange: tickRange
  };
};
