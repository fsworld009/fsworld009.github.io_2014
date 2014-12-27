var projects_panel = function(){
    var skill_map_json;
    function loadLabelMap(){
        $.getJSON("./json/skill_map.json",function(json){
            skill_map_json = json;
            loadProjects();
        });
    }

    function showProjectDetail(project){
        $.getJSON("./json/"+project.detail+".json",function(project_detail){
            var project_panel = $("#project-detail");
            project_panel.find(".panel-title").html(project.title + " (" + project.date + ")");
            project_panel.find(".panel-body").children().first().html(project_detail.description);
            for (var i in project_detail.points){
                project_panel.find(".keypoints").children().first().append("<li>"+project_detail.points[i]+"</li>");
            }
            
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
                }else{
                    project_panel.find(".read-more").on("click",function(ev){
                        showProjectDetail(project);
                    });
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
