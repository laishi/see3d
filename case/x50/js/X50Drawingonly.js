"use strict"

b4w.register("x50drawing", function(exports, require) {

    var m_app = require("app");
    var m_cfg = require("config");
    var m_data = require("data");
    var m_geom = require("geometry");
    var m_mat = require("material");
    var m_scs = require("scenes");
    var m_obj = require("objects");
    var m_trans = require("transform");

    var m_time = require("time");
    var m_camera_anim = require("camera_anim");




    var mouseX = 0;
    var mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var x50drawing = document.getElementById("x50drawing");

    alert("yes")  




    exports.init = function(id) {
        m_app.init({
            canvas_container_id: id,
            callback: init_cb,
            physics_enabled: false,
            show_fps: false,
            alpha: true,
            gl_debug: true,
            autoresize: true,
            console_verbose: true
        });
    }

    function init_cb(canvas_elem, success) {

        if (!success) {
            console.log("b4w init failure");
            return;
        }

        m_app.enable_controls();


        load();



    }


    function load() {        
        m_data.load("assets/obj/X50Drawing/X50Drawingonly.json", load_cb );
    }

    function load_cb(data_id) {
        m_app.enable_camera_controls();

        makeTyreCopy();

        tyreRot();



        x50drawing.addEventListener("mousemove", MouseRot, false);


    }









    function makeTyreCopy() {

        var TyreFL = m_scs.get_object_by_name("TyreFL");

        var TyreFtoB = m_obj.copy(TyreFL, "TyreBL", false);
        var TyreFtoR = m_obj.copy(TyreFL, "TyreFR", false);

        var TyreRtoB = m_obj.copy(TyreFL, "TyreRB", false);


        m_trans.move_local(TyreFtoB, 0, 0, -18);

        m_trans.move_local(TyreFtoR, -10, 0, 0);
        m_trans.set_rotation_euler(TyreFtoR, 0, Math.PI, 0);

        m_trans.move_local(TyreRtoB, -10, 0, -18);
        m_trans.set_rotation_euler(TyreRtoB, 0, Math.PI, 0);


        m_scs.append_object(TyreFtoB);
        m_scs.append_object(TyreFtoR);
        m_scs.append_object(TyreRtoB);

    }



    function MouseRot(event) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;

        var rotAtoR = mouseX * (Math.PI/180) * 0.025;
        

        var TyreFL = m_scs.get_object_by_name("TyreFL");
        var TyreFR = m_scs.get_object_by_name("TyreFR");


        m_trans.set_rotation_euler(TyreFL, 0, rotAtoR, 0);
        m_trans.set_rotation_euler(TyreFR, 0, Math.PI + rotAtoR, 0);
    }




    var tyreRotS = [0,0,0];
    var tyreRotT = [0,0,0];




    function tyreRot() {



        var rotAtoR = mouseX * (Math.PI/180) * 0.025;
        var curTime = Date.now();

        console.log(curTime);


        var TyreFL = m_scs.get_object_by_name("TyreFL");
        var TyreFR = m_scs.get_object_by_name("TyreFR");

        m_trans.set_rotation_euler(TyreFL, curTime, rotAtoR, 0);
        m_trans.set_rotation_euler(TyreFR, curTime, Math.PI + rotAtoR, 0);
    }




});


