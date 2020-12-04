"use strict"

var canvasNav = {
    // 顯示訊息
    showMessage(message, countDown = 2) {
        $("#message").html(message).show()
        let messageInterval = setInterval(function() {
            $("#message").hide("slow")
            clearInterval(messageInterval)
        }, countDown * 1000)
    },

    // 顯示影片 OSD 訊息
    showOSD(message, position = "center", fadeOutEffect = "increase", fadeOutSeconds = 1.2) {
        $("#video_osd").finish().removeAttr("style") //清除之前的效果，讓 OSD 可以再次顯示
        $("#video_osd").html(message).show()
        $("#video_osd").attr("class", `osd_${position}`)
        // OSD 訊息置中（使用 transform -50％會影響動畫效果）
        $("#video_osd").css("margin-left", -($("#video_osd").width() / 2))
        $("#video_osd").css("margin-top", -($("#video_osd").height() / 2))

        switch (fadeOutEffect) {
            case "increase":
                $("#video_osd").css("transform", "scale(1.3)")
                break
            case "decrease":
                $("#video_osd").css("transform", "scale(0.7)")
                break
            case "right":
                $("#video_osd").css("transform", "translate(1.2em)")
                break
            case "left":
                $("#video_osd").css("transform", "translate(-1.2em)")
                break
            case "none":
                break
        }

        $("#video_osd").animate({
            opacity: "0"
        }, fadeOutSeconds * 1000, function() {
            $(this).hide()
        })
    },

    // 清空畫布
    clearCanvas(isShowOsd = true) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        if (isShowOsd) {
            this.showOSD("清空畫布", "center", "increase")
        }
    },

    // 設定畫筆物件選單
    setupDrawObj() {
        $(".draw_property_block").hide()
        $("#pen_type_" + $("#pen_type").val()).show()
        drawObj[$("#pen_type").val()].setup()
    },

    // 初始化畫筆UI
    initDrawUI() {
        // 依照畫筆物件設定，加入畫筆顏色選項，設定畫筆顏色
        $.each(pen.colors, function(colorName, value) {
            $("#pen_color").append(`<option value="${value}" style="color:${value};">${colorName}</option>`)
        })
        $("#pen_color").css("color", $("#pen_color").val())
        $("#control").show()
    },

    // 建立測試 canvas
    createTestCanvas() {
        $("#canvas_area").show()
        $("#canvas_area").css("border", "2px solid grey")
        $("#canvas_area").css("margin-top", "4em")
        $("#video_content").css("top", "4em")
        ctx.canvas.width = $(window).width() * 0.8
        ctx.canvas.height = $(window).height() * 0.8
        $("#container").css("position", "inherit")
        $("#select_video_button").hide()
        this.initDrawUI()
        this.setupDrawObj()
    }
}