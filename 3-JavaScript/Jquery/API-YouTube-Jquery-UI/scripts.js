$(document).ready(function () {
    let title = '', link = '', video_id = '', duration = '';
    $("#tabs").tabs();

    let videos = ["hsXeFqj5p7Q", "3nad7SQhtno", "ZptSB7moRGg", "EjIEsqTCc8c", "B_o2NhbyzX0"];
    let player;
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    $("li").click(function () {
        let id = $(this).attr("id");
        if($("#playerVideo").length){
            player.destroy();
            $("#playerVideo").remove();
        }
        if (id > 0) {
            $(`#tabs-${id}`).html("");
            $(`#tabs-${id}`).prepend(`<div id="playerVideo"></div>`);

            function getVideo(id) {
                player = new YT.Player('playerVideo', {
                    height: '360',
                    width: '640',
                    videoId: videos[id - 1],
                    playerVars: {

                    },
                    events: {
                        'onReady': onPlayerReady,
                    }
                });
            }

            function onPlayerReady(event) {
                video_id = event.target.getVideoData()["video_id"];
                title = event.target.getVideoData()["title"];
                link = event.target.getVideoUrl();
                duration = event.target.getDuration();
                $(`#tabs-${id}`).append(`<div class="accordion">
                    <h3>Título</h3>
                    <div> ${title} </div>
                    <h3>ID do vídeo</h3>
                    <div> ${video_id} </div>
                    <h3>Link do vídeo</h3>
                    <div> ${link} </div>
                    <h3>Duração</h3>
                    <div> ${duration} segundos </div>
                </div>`);
                $(function () {
                    $(".accordion").accordion({
                        collapsible: true,
                        active: false
                    });
                });
                console.log(title, link, video_id, duration);
                event.target.setVolume(50)
                event.target.playVideo();
            }

            function onYouTubeIframeAPIReady() {
                getVideo(id);
            }
            onYouTubeIframeAPIReady();
            
        }
    });
});