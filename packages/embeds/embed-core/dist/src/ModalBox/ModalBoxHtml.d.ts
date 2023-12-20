declare const html = "<style>\n.my-backdrop {\n  position:fixed;\n  width:100%;\n  height:100%;\n  top:0;\n  left:0;\n  z-index:99999999;\n  display:block;\n  background-color:rgb(5,5,5, 0.8)\n}\n\n.modal-box {\n  margin:0 auto;\n  margin-top:20px;\n  margin-bottom:20px;\n  position:absolute;\n  width:100%;\n  top:50%;\n  left:50%;\n  transform: translateY(-50%) translateX(-50%);\n  overflow: auto;\n}\n\n.header {\n  position: relative;\n  float:right;\n  top: 10px;\n}\n.close {\n  font-size: 30px;\n  left: -20px;\n  position: relative;\n  color:white;\n  cursor: pointer;\n}\n/*Modal background is black only, so hardcode white */\n.loader {\n  --cal-brand-color:white;\n}\n</style>\n<div class=\"my-backdrop\">\n<div class=\"header\">\n  <span class=\"close\">&times;</span>\n</div>\n<div class=\"modal-box\">\n  <div class=\"body\">\n    <div id=\"wrapper\" class=\"z-[999999999999] absolute flex w-full items-center\">\n      <div class=\"loader modal-loader border-brand-default dark:border-darkmodebrand\">\n        <span class=\"loader-inner bg-brand dark:bg-darkmodebrand\"></span>\n      </div>\n      </div>\n    <div id=\"error\" class=\"hidden left-1/2 -translate-x-1/2 relative text-inverted\"></div>\n    <slot></slot>\n  </div>\n</div>\n</div>";
export default html;
//# sourceMappingURL=ModalBoxHtml.d.ts.map