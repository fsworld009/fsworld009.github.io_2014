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
                console.log(project);
                var project_panel = $("#project-template").clone();
                project_panel.removeAttr("id").appendTo("#project-place-holder");
                project_panel.find(".panel-title").html(project.title + " (" + project.date + ")");
                project_panel.find(".panel-body").children().first().html(project.summary);

                var project_skills = project_panel.find(".skills");
                for (var i in project.skills){
                    project_skills.append("<span class=\"label label-" + skill_map_json.labels[ skill_map_json.skills [project.skills[i] ]  ] + "\">" + project.skills[i] + "</span> ");
                }

                if(typeof project.detail_id !== "undefined"){
                    project_panel.find(".read-more").find("a").attr("href","project_detail.html#"+project.detail_id);
                }else if(typeof project.project_id !== "undefined"){
                    project_panel.find(".read-more").find("a").attr("href","./"+project.project_id+"/").attr("target","_blank");
                }else if(typeof project.external_link !== "undefined"){
                    project_panel.find(".read-more").find("a").attr("href",project.external_link).attr("target","_blank");
                }else{
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
