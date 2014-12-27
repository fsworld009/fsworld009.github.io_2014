var photoswipe = function(){
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var items = null;
    var options = {history:false};
    var gallery = null;

    function push_item(src, width, height, caption){
        if(items === null){
            items = [];
        }
        items.push({
            src: src,
            w: width,
            h: height,
            title: caption
        });
    }

    function show(index){
        if(items === null){
            return;
        }
        options.index = index;
        // if(gallery === null){
            gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        // }
        gallery.init();
    }

    return{
        push_item: push_item,
        show: show
    };
}();


var project_detail = function(){
    var skill_map_json;
    var project_name = window.location.hash.substring(1);

    function begin(){
        if(project_name !== ""){
            loadLabelMap();
        }
    }

    
    function loadLabelMap(){
        $.getJSON("./json/skill_map.json",function(json){
            skill_map_json = json;
            showProjectDetail();
        });
    }

    function showProjectDetail(){
        $.getJSON("./json/"+project_name+".json",function(project){
            $("title").html(project.title);

            
            var project_panel = $("#project-detail");
            project_panel.find(".panel-title").html(project.title + " (" + project.date + ")");
            project_panel.find(".panel-body").children().first().html(project.description);
            for (var i in project.points){
                project_panel.find(".keypoints-list").append("<li>"+project.points[i]+"</li>");
            }

            var project_skills = project_panel.find(".skills");
            for (i in project.skills){
                project_skills.append("<span class=\"label label-" + skill_map_json.labels[ skill_map_json.skills [project.skills[i] ]  ] + "\">" + project.skills[i] + "</span> ");
            }



            //screen shots

            var project_screenshots = project_panel.find(".screenshots");
            for(i in project.screenshots){
                var screenshot = project.screenshots[i];
                var src_prefix = "./screenshots/" + project_name + "-" + ("000" + (Number(i)+1) ).slice(-3);
                var src_thumbnail =  src_prefix + '-thumbnail.' + screenshot.extension;
                var src = src_prefix + '.' + screenshot.extension;
                var width = screenshot.width;
                var height = screenshot.height;
                var caption = screenshot.caption;

                project_screenshots.append('<a href="' + src + '" class="screenshots-click" ><img class="thumbnail" style="display:inline" title="' + screenshot.caption + '" src="' + src_thumbnail +'"></a> ');

                photoswipe.push_item(src, width, height, caption);
            }

            //register click event on thumbnails
            $(".screenshots-click").on("click",function(ev){
                ev.preventDefault();
                console.log($(this).index());
                photoswipe.show($(this).index()-1); //the first element is <br>
            });

            var project_links = project_panel.find(".links");
            for (i in project.links){
                project_links.append('<a href="' + project.links[i].url + '" target="_blank">' + project.links[i].name + '</a>');
            }
        });
    }

    return {loadProjectDetail : begin};
}();

$(document).ready(function(){

    project_detail.loadProjectDetail();


    
    
});
