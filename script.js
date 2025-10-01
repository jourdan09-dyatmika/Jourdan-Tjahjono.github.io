$(document).ready(function () {
  $(".contentsPanel").each(function () {
    $(this).prepend(
      '<div class="hidePanel">[hide]</div><div class="showPanel">[show]</div>'
    );
  });

  $(".hidePanel").click(function () {
    $(this)
      .siblings("ul")
      .hide(150, function () {
        $(this).parent().addClass("minimizedPanel");
      });
  });
  $(".showPanel").click(function () {
    $(this)
      .siblings("ul")
      .show(150, function () {
        $(this).parent().removeClass("minimizedPanel");
      });
  });
});
