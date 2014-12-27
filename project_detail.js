
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
