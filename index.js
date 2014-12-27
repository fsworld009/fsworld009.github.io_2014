var projects_panel = function(){
    var skill_map_json;
    function loadLabelMap(){
        $.getJSON("./json/skill_map.json",function(json){
            skill_map_json = json;
            loadProjects();
        });
    }

    
    function loadProjects(){
        $.getJSON("./json/projects.json",function(json){
            $.each(json,function(index,project){
                var project_panel = $("#project-template").clone();
                project_panel.attr("id",project.id).appendTo("#project-place-holder");
                project_panel.find(".panel-title").html(project.title + " (" + project.date + ")");
                project_panel.find(".panel-body").children().first().html(project.summary);

                var project_skills = project_panel.find(".skills");
                for (var i in project.skills){
                    project_skills.append("<span class=\"label label-" + skill_map_json.labels[ skill_map_json.skills [project.skills[i] ]  ] + "\">" + project.skills[i] + "</span> ");
                }

                if(!project.read_more){
                    project_panel.find(".read-more").remove();
                }
            });
        });
    }


    return {
        loadProjects: loadLabelMap
    };
}();

$(document).ready(function(){
    projects_panel.loadProjects();

});
