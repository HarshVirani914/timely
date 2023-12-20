const r = "http://localhost:3000/embed/embed.js";
function p(d = r) {
  (function(a, l, s) {
    let i = function(t, n) {
      t.q.push(n);
    }, o = a.document;
    a.Cal = a.Cal || function() {
      let t = a.Cal, n = arguments;
      if (t.loaded || (t.ns = {}, t.q = t.q || [], o.head.appendChild(o.createElement("script")).src = l, t.loaded = !0), n[0] === s) {
        const e = function() {
          i(e, arguments);
        }, c = n[1];
        e.q = e.q || [], typeof c == "string" ? (
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          (t.ns[c] = e) && i(e, n)
        ) : i(t, n);
        return;
      }
      i(t, n);
    };
  })(
    window,
    //! Replace it with "https://cal.com/embed.js" or the URL where you have embed.js installed
    d,
    "init"
  );
  /*!  Copying ends here. */
  return window.Cal;
}
const u = p.toString();
export {
  u as EmbedSnippetString,
  p as default
};
