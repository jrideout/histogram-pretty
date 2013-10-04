Histogram Pretty
============

Histogram Pretty was built to identify reasonable histogram bucket
sizing for charting applications. It tries to follow a combination of
the R base graphics histogram logic and D3. I've chosen the Freedman and
Diaconis (1981) Rule, which limits the influence of outliers in bucket
width selection. This seems to significantly improve binning for dynamic
charting where the data is often filtered into irregular subsets.

### Usage

```
var vector = ... // vector extraction logic
var hist = histogram(vector);
```

#### Parameters

The `vector` should be an array of numeric values. Optionally, you may
also pass an options object with one of two values:

* `copy` If truthy, will copy the array with `vector.slice()` prior to
internally sorting the vector. It is true by default, but if mutability
is acceptable can be set to true.

* `pretty` If truthy, will round bin sizing to a factor of 2, 5 or 10
within the relevant scale of the bin size. It is true by default.
Otherwise the raw bin size as returned by the Freedman-Diaconis Rule
will be returned.

#### Returns

The `histogram` function returns an object with three values:

* `size` - the bin width
* `fun` - a binning function. This is simply: `function(d) { return h * Math.floor(d / h); }`
Where `h` is the `size`.
* `tickRange` will return a function to compute ticks for visual display
on a chart axis. Some charting libraries (such as d3) do not take into
account the discretization when identify axis ticks. This function will
always break on a bin boundary. Call `tickRange(n)` with a requested
number of ticks as appropriate for the chart display. The function will
return approximately `n` ticks as an array of breaks in the units of
the vector.

### Example

See: http://jrideout.github.io/histogram-pretty
