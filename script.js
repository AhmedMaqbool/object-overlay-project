const canvas = new fabric.Canvas("canvas", { isDrawingMode: false });
const imgUpload = document.getElementById("img");
const draw = document.querySelector("#draw");
const rectangle = document.querySelector("#rectangle");
const tag = document.querySelector("#tag");
const remove = document.querySelector("#remove");
const download = document.querySelector("#download");

canvas.freeDrawingBrush.color = "white";
canvas.freeDrawingBrush.width = 4;
draw.setAttribute("disabled", "disabled");
rectangle.setAttribute("disabled", "disabled");
tag.setAttribute("disabled", "disabled");
download.setAttribute("disabled", "disabled");

imgUpload.addEventListener("change",  (e) => {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function (f) {
    var data = f.target.result;

    var img = new Image();
    img.src = data;
    img.onload = function () {
      canvas.setWidth(this.width);
      canvas.setHeight(this.height);
    };

    fabric.Image.fromURL(data, function (img) {
      canvas.clear()
      draw.removeAttribute("disabled");
      rectangle.removeAttribute("disabled");
      tag.removeAttribute("disabled");
      download.removeAttribute("disabled");
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });
  };
  reader.readAsDataURL(file);
});

draw.addEventListener("click", () => {
  canvas.freeDrawingBrush.color = "red";
  canvas.isDrawingMode = !canvas.isDrawingMode;
});

rectangle.addEventListener("click", () => {
  canvas.isDrawingMode = false;
  const rectangle = new fabric.Rect({
    left: canvas.getWidth() / 2,
    top: 40,
    width: 60,
    height: 60,
    fill: "transparent",
    stroke: "orange",
    strokeWidth: 4,
    strokeUniform: true
  });
  canvas.add(rectangle);
});

tag.addEventListener('click',  () => {
  canvas.isDrawingMode = false;
  const text = new fabric.IText('Text', {
      left: canvas.getWidth() / 2,
      top: 40,
      objecttype: 'text',
      fontFamily: 'arial black',
      fill: 'red',
  });
  canvas.add(text);
});

remove.addEventListener("click", () => {
  canvas.isDrawingMode = false;
  canvas.remove(canvas.getActiveObject());
});

canvas.on("selection:created", () => {
  remove.removeAttribute("disabled");
});

canvas.on("selection:cleared", () => {
  remove.setAttribute("disabled", "disabled");
});

download.addEventListener("click" , () => {
   const dataURL = canvas.toDataURL();
   const link = document.createElement('a');
   link.download = 'image.png';
   link.href = dataURL;
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
})