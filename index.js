

function home() {
    let mainpage = document.getElementById("main");
    if (!document.getElementById("nav-main")) {
        mainpage.setAttribute("style", "padding-right: 0; padding-left: 0;");
        let navH = document.getElementById("navHead");
        let navDiv = document.createElement("div");
        navDiv.id = "nav-main";
        navDiv.setAttribute("class", "container-fluid d-flex align-items-center justify-content-around fixed-top");
        navDiv.setAttribute("style", "background-color: rgba(0, 0, 0, 0.068); height: 45px;")

        let leftDiv = document.createElement("div");
        leftDiv.id = "main-left";
        leftDiv.innerHTML = "<strong>CRM</strong>"
        navDiv.appendChild(leftDiv)

        let midDiv = document.createElement("div");
        midDiv.id = "main-mid";
        midDiv.setAttribute("class", "d-flex align-items-center");



        midDivLeft = document.createElement("div");
        midDivLeft.id = "midDivLeft";
        midDivLeft.innerHTML = "MY Project"
        midDivLeft.setAttribute("style", "cursor: pointer;");
        midDivLeft.setAttribute("class", "p-3");
        midDivLeft.setAttribute("onclick", "addTask()")
        midDiv.appendChild(midDivLeft);

        midDivRight = document.createElement("div");
        midDivRight.id = "midDivRight";
        midDivRight.innerHTML = "MY Tasks"
        midDivRight.setAttribute("style", "cursor: pointer;");
        midDivRight.setAttribute("class", "p-3");
        midDivRight.setAttribute("onclick", "detail()")
        midDiv.appendChild(midDivRight);


        navDiv.appendChild(midDiv)

        let rightDiv = document.createElement("div");
        if (!sessionStorage.length > 0) {
            let rightdiv1 = document.createElement("div");
            let but1 = document.createElement("button");
            but1.textContent = "login";
            but1.setAttribute("class", "btn btn-outline-dark btn-sm m-1")
            but1.setAttribute("onclick", "login()");
            let but2 = document.createElement("button");
            but2.textContent = "signup";
            but2.setAttribute("class", "btn btn-outline-dark btn-sm m-1")
            but2.setAttribute("onclick", "signup()");
            rightDiv.id = "main-right";
            rightdiv1.appendChild(but1)
            rightdiv1.appendChild(but2)
            rightDiv.appendChild(rightdiv1)
        }
        else {
            let but1 = document.createElement("button");
            but1.textContent = "logout";
            but1.id = "logOut"
            but1.setAttribute("class", "btn btn-outline-dark btn-sm m-1")
            but1.setAttribute("onclick", "logout()");
            rightDiv.appendChild(but1)
        }
        navDiv.appendChild(rightDiv)
        navH.appendChild(navDiv)
    }
    else {
        document.getElementById("nav-main").remove();
        if (document.getElementById("div1")) {
            document.getElementById("div1").remove()
        }
        home()
    }
}


function detail() {
    if (!document.getElementById("div1")) {
        let mainBody = document.getElementById('mainBody');
        let mainDiv = document.createElement("div");
        mainDiv.id = "div1";
        let div2 = document.createElement("div");
        div2.id = "div2"
        getData().Task.map(x => {
            proDetail(x, div2);
        })
        mainDiv.appendChild(div2)
        mainBody.appendChild(mainDiv)

    }
    else {
        let f = document.getElementById("div1")
        f.remove()
        detail()
    }
}


function proDetail(x, y) {
    if (document.getElementById("mypro2")) {
        document.getElementById("mypro2").remove()
    }

    let TDD = document.createElement("div");
    TDD.setAttribute("class", "container-fluid border")
    TDD.setAttribute("style", "padding: 5px 0; cursor: pointer;")
    TDD.setAttribute("onclick", `taskDetail(${JSON.stringify(x)})`)
    let r = document.createElement("div");
    r.setAttribute("class", "row");
    r.setAttribute("style", "margin:0;");
    let c1 = document.createElement("div");
    c1.setAttribute("class", 'col-md-6')
    c1.setAttribute("style", 'padding: 0;')
    c1.innerHTML = `<strong>${x.proName}</strong>`
    let c2 = document.createElement("div");
    c2.setAttribute("style", 'padding: 0;')
    c2.innerHTML = `<strong>${x.proDesc}</strong>`
    c2.setAttribute("class", 'col-md-6')
    r.appendChild(c1)
    r.appendChild(c2)
    TDD.appendChild(r)
    y.appendChild(TDD)
}


function taskDetail(x) {

    if (document.getElementById("div2")) {
        document.getElementById("div2").remove()
    }
    if (document.getElementById("div1")) {
        document.getElementById("div1").remove()
    }

    let main = document.getElementById("mainBody")
    let t2 = document.createElement("div");
    t2.setAttribute("class", "container-fluid")
    t2.id = "div1"
    let tab = document.createElement("table")
    tab.setAttribute("class", "table table-striped")
    let tr = document.createElement("tr");

    let th1 = document.createElement("th");
    th1.setAttribute("scope", "col")
    th1.textContent = "Sno.";

    let th5 = document.createElement("th");
    th5.setAttribute("scope", "col")
    th5.textContent = "Status";

    let th3 = document.createElement("th");
    th3.setAttribute("scope", "col")
    th3.textContent = "Task";

    let th4 = document.createElement("th");
    th4.setAttribute("scope", "col")
    th4.textContent = "Last date";

    let th6 = document.createElement("th");
    th6.setAttribute("scope", "col")
    th6.textContent = "Assign date";



    tr.appendChild(th1);
    tr.appendChild(th3);
    tr.appendChild(th6);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tab.appendChild(tr)
    t2.appendChild(tab);
    taskInTaskDetail(x, tab)
    main.appendChild(t2);

}

function taskInTaskDetail(x, y) {
    let mydata = x.tasks;
    let i = 1
    mydata.map(z => {
        let tr = document.createElement("tr");

        let th1 = document.createElement("th");
        th1.textContent = i;

        let th2 = document.createElement("td");
        th2.textContent = z.user;

        let th5 = document.createElement("td");
        if (z.status) {
            th5.innerHTML = "<strong style='color: green;'>completed &check;</strong>";
        }
        else {

            th5.innerHTML = `<strong id='mainSpan'><span style='padding: 2px; color:#b0b006bd;'>pending</span>/<span style='color: green;  cursor: pointer;  padding: 2px;' onclick='update(${JSON.stringify(x)},${JSON.stringify(z)})'   >update</span></strong>`;
        }

        let th3 = document.createElement("td");
        th3.textContent = z.task;

        let th4 = document.createElement("td");
        th4.textContent = z.lDate;

        let th6 = document.createElement("td");
        th6.textContent = z.aDate;

        tr.appendChild(th1);
        tr.appendChild(th3);
        tr.appendChild(th6);
        tr.appendChild(th4);
        tr.appendChild(th5);
        y.appendChild(tr)
        i++;
    })
}


function update(x, y) {
    let a = document.getElementById("mainSpan")
    a.textContent = ""
    let b = document.createElement("span");
    b.textContent = "completed ?"
    b.setAttribute("style", "color: green; border: 1px solid black; padding: 5px; cursor: pointer;")
    b.setAttribute("onclick", `done(${JSON.stringify(x)},${JSON.stringify(y)})`);
    a.appendChild(b)
}

function done(x, y) {

    let b = JSON.parse(localStorage.getItem(x.giveById))

    for (let i = 0; i < b.projects.length; i++) {
        if (b.projects[i].proName == x.proName) {
            for (let j = 0; j < b.projects[i].tasks.length; j++) {
                if (y.task == b.projects[i].tasks[j].task) {
                    b.projects[i].tasks[j].status = true;
                    b.projects[i].tasks.splice(j, 1, b.projects[i].tasks[j])
                    localStorage.setItem(x.giveById, JSON.stringify(b));
                }
            }
        }
    }



    let a = getData();

    for (let i = 0; i < a.Task.length; i++) {
        if (a.Task[i].proName == x.proName) {
            for (let j = 0; j < a.Task[i].tasks.length; j++) {
                if (y.task == a.Task[i].tasks[j].task) {
                    a.Task[i].tasks[j].status = true;
                    a.Task[i].tasks.splice(j, 1, a.Task[i].tasks[j])
                    proUp(a)
                    taskDetail(a.Task[i])
                }
            }
        }
    }


}

function logout() {
    document.getElementById("nav-main").remove();
    sessionStorage.clear();
    home()
    login()
}
function getData() {
    if (sessionStorage.length > 0) {
        let x = JSON.parse(sessionStorage.getItem("ide"));
        let y = JSON.parse(localStorage.getItem(x))
        return y
    }
    else {
        return false
    }

}


function addTask() {

    if (!document.getElementById("div1")) {
        let MB = document.getElementById("mainBody");

        let div1 = document.createElement("div");
        div1.setAttribute("style", " height: 45px;");
        div1.id = "div1";
        div1.setAttribute("class", "row");
        div1.setAttribute("class", "container-fluid d-flex align-items-center  justify-content-around");


        let div11 = document.createElement("div");
        div11.id = "m1"
        div11.setAttribute("class", "col-md-4 offset-md-1");
        div11.innerHTML = "<strong>Create Project<button id='newpro' onclick='newPro()' class='btn btn-success btn-sm' style='border-radius: 20px; margin:4px;'>+</button></strong>";


        let div12 = document.createElement("div");
        div12.id = "m2"
        div12.setAttribute("class", "col-md-6");
        let inpTag = document.createElement("input");
        inpTag.id = "proSrc";
        inpTag.type = "text";
        inpTag.placeholder = "search"
        inpTag.setAttribute("class", "form-control")
        inpTag.setAttribute("onkeyup", "filterPro()");
        div12.appendChild(inpTag);


        if (document.getElementById("mypro2")) {
            let rem = document.getElementById("mypro2")
            rem.remove();
        }
        let div2 = document.createElement("div");
        div2.id = "mypro2"
        div2.setAttribute("class", "container mt-4");


        if (getData()) {
            let ult = document.createElement("ul");
            ult.setAttribute("class", "list-group")
            ult.id = "mylist"
            showTask(ult, getData())
            div2.appendChild(ult);
        }
        else {
            div2.innerHTML = "<h4>login required!<h4>"
        }

        div1.appendChild(div11);
        div1.appendChild(div12);
        MB.appendChild(div1);
        MB.appendChild(div2);
    }
    else {
        let f = document.getElementById("div1")
        f.remove();
        addTask();
    }
}


function showTask(con, xy) {
    // console.log(xy);
    let i = 1
    xy.projects.map(x => {
        let sd = xy.projects.indexOf(x)
        let lit = document.createElement("li");
        lit.id = sd;
        lit.setAttribute("onclick", `taskIn(${sd})`);
        lit.setAttribute("class", "list-group-item");
        lit.setAttribute("style", "cursor: pointer;");
        let r = document.createElement("div");
        r.setAttribute("class", "row");
        let srLeft = document.createElement("div");
        srLeft.setAttribute("class", "col-md-2");
        srLeft.textContent = i;


        let rLeft = document.createElement("div");
        rLeft.setAttribute("class", "col-md-4");
        rLeft.textContent = x.proName;

        let rRight = document.createElement("div");
        rRight.setAttribute("class", "col-md-6");
        rRight.textContent = x.proDesc;

        r.appendChild(srLeft);
        r.appendChild(rLeft);
        r.appendChild(rRight);
        lit.appendChild(r)
        con.appendChild(lit)
        i++;
    })


}



function taskIn(x) {

    if (document.getElementById("mypro2")) 
        { document.getElementById("mypro2").remove() }
    document.getElementById("div1").remove();
    let main = document.getElementById("mainBody")
    let tMain = document.createElement("div");
    tMain.id = "div1"
    tMain.setAttribute("style", "")
    let t1 = document.createElement("div");
    t1.setAttribute("class", "container")
    t1.setAttribute("style", "padding:4px 0;")
    let t11 = document.createElement("div");
    t11.setAttribute("class", "row")
    let t111 = document.createElement("div");
    t111.setAttribute("class", "col-md-6")
    t111.innerHTML = "<strong>All tasks</strong>"
    let t112 = document.createElement("div");
    t112.setAttribute("class", "col-md-6")
    t112.innerHTML = `<button onclick= 'newtask(${x})'' type='button' class='btn btn-outline-dark btn-sm' style = 'border: none;'><strong>add <span style='color: green;  text-decoration: underline;'>task</span></strong></button>`
    t11.appendChild(t111)
    t11.appendChild(t112)
    t1.appendChild(t11)


    let t2 = document.createElement("div");
    t2.setAttribute("class", "container-fluid")
    t2.id = "t2"
    let tab = document.createElement("table")
    tab.setAttribute("class", "table table-striped")
    let tr = document.createElement("tr");

    let th1 = document.createElement("th");
    th1.setAttribute("scope", "col")
    th1.textContent = "Sno.";

    let th2 = document.createElement("th");
    th2.setAttribute("scope", "col")
    th2.textContent = "Username";
    let th5 = document.createElement("th");
    th5.setAttribute("scope", "col")
    th5.textContent = "Status";

    let th3 = document.createElement("th");
    th3.setAttribute("scope", "col")
    th3.textContent = "Task";

    let th4 = document.createElement("th");
    th4.setAttribute("scope", "col")
    th4.textContent = "Last date";

    let th6 = document.createElement("th");
    th6.setAttribute("scope", "col")
    th6.textContent = "Assign date";

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th6);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tab.appendChild(tr)
    t2.appendChild(tab);
    taskInTask(x, tab);
    tMain.appendChild(t1)
    tMain.appendChild(t2)
    main.appendChild(tMain);



}

function taskInTask(x, y) {
    let mydata = getData();
    let i = 1
    mydata.projects[x].tasks.map(z => {
        console.log(mydata.projects[x])
        let tr = document.createElement("tr");

        let th1 = document.createElement("th");
        th1.textContent = i;

        let th2 = document.createElement("td");
        th2.textContent = z.user;

        let th5 = document.createElement("td");
        if (z.status) {
            th5.innerHTML = "<strong style='color: green;'>completed &check;</strong>";
        }
        else {

            th5.innerHTML = `<strong id='mainSpan'><span style='padding: 2px; color:#b0b006bd;'>pending</span></strong>`;
        }
        let th3 = document.createElement("td");
        th3.textContent = z.task;

        let th4 = document.createElement("td");
        th4.textContent = z.lDate;

        let th6 = document.createElement("td");
        th6.textContent = z.aDate;

        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th6);
        tr.appendChild(th4);
        tr.appendChild(th5);
        y.appendChild(tr)
        i++;
    })
}



function taskValidate(n) {
    if (taskdif() && taskDate()) {
        let x = document.getElementById("task").value;
        let y = document.getElementById("Last-date").value;
        let z = document.getElementById("st").value;
        let a = getData();
        const today = new Date();
        const date = today.getDate().toString().padStart(2, '0');
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const year = today.getFullYear().toString();
        const formattedDate = `${date}-${month}-${year}`
        let c = {
            "task": x,
            "aDate": formattedDate,
            "lDate": y,
            "user": z,
            "status": false
        }
        a.projects[n].tasks.push(c);
        proUp(a);

        for (let i = 1; i <= localStorage.length; i++) {
            let j = JSON.parse(localStorage.getItem(i));
            let c2 = {
                "task": x,
                "aDate": formattedDate,
                "lDate": y,
                "status": false
            }
            if (j.Username == z) {
                j.Task.map(x => {
                    if (a.projects[n].proName == x.proName) {
                        x.tasks.push(c2);
                    }
                })
                let hn = JSON.stringify(j);
                localStorage.setItem(i, hn)
            }
        }

        return true;
    }
    else {
        return false
    }
}
function taskDate() {
    let x = document.getElementById("Last-date").value;
    let y = document.getElementById("unErr");
    y.setAttribute("style", "color: red;")
    if (x.length == 0) {
        y.innerText = "*field required"
        return false;
    }
    else { return true }

}
function taskdif() {
    let x = document.getElementById("task").value;
    let y = document.getElementById("tErr");
    y.setAttribute("style", "color: red;")
    if (x.length == 0) {
        y.innerText = "*field required"
        return false;
    }
    else { return true }

}
function newtask(x) {
    let mydata = getData();
    document.getElementById("t2").remove();

    let divA = document.getElementById("div1");
    let divAA = document.createElement("div");
    divAA.setAttribute("style", "margin: 45px 0;")
    divAA.id = "t2"
    let myform = document.createElement("form")
    divAA.appendChild(myform);
    divA.appendChild(divAA);
    myTeam.method = "POST";
    myTeam.id = "myform";
    //Task	Last date	Assign date	


    let y = [
        { 'labelName': "Enter Last-date", "inputType": 'date', 'for': 'Last-date', "ph": "date", "sid": 'unErr', },
    ]


    let div23 = document.createElement("div");
    div23.setAttribute("class", "form-group w-50 m-auto");
    let lat = document.createElement("label");
    lat.textContent = "Enter task"
    lat.setAttribute("for", "task");
    let tex = document.createElement("textarea");
    tex.setAttribute("class", "form-control")
    tex.id = "task"
    let tErr = document.createElement("small")
    tErr.id = "tErr"
    div23.appendChild(lat);
    div23.appendChild(tex);
    div23.appendChild(tErr);
    myform.appendChild(div23);

    y.map(x => {
        let div2 = document.createElement("div");
        div2.setAttribute("class", "form-group w-50 m-auto");
        let labelT = document.createElement("label");
        let inputT = document.createElement("input");
        labelT.setAttribute("for", x.for);
        labelT.textContent = x.labelName;
        inputT.id = x.for;
        inputT.type = x.inputType;
        inputT.setAttribute("onkeyup", x.onkeyup1)
        inputT.setAttribute("class", "form-control");
        inputT.name = x.inputType;
        inputT.placeholder = x.ph
        inputT.setAttribute("onkeyup", x.ve);
        div2.appendChild(labelT)
        div2.appendChild(inputT)
        let spanT = document.createElement("small");
        spanT.id = x.sid;
        div2.appendChild(spanT);
        myform.appendChild(div2)

    });
    let st = document.createElement("select");
    st.id = "st";
    st.name = "myUs";
    st.setAttribute("class", 'form-control')
    mydata.projects[x].myTeam.map(x => {
        let opt = document.createElement("option");
        opt.value = x;
        opt.textContent = x;
        st.appendChild(opt);
    })

    let div2 = document.createElement("div");
    div2.setAttribute("class", "form-group w-50 m-auto");

    let lt = document.createElement("lable");
    lt.textContent = "Select user";
    lt.setAttribute("for", "st")

    div2.appendChild(lt)
    div2.appendChild(st)
    myform.appendChild(div2);



    let bd = document.createElement("div");
    let bb = document.createElement("button");
    bd.setAttribute("class","form-group w-50 m-auto");
    bd.setAttribute("style", " padding: auto; padding-top: 20px;");
    bb.textContent = "button"
    bb.type = "create"
    bd.appendChild(bb)
    myform.appendChild(bd)

    bb.setAttribute("class", "btn btn-success m-auto");
    bb.onclick = () => {
        if (taskValidate(x)) {
            taskIn(x)
        }
        else {
            return false
        }
    }



}





function filterPro() {
    let usrc = document.getElementById('proSrc').value.trim();
    let n = usrc.toUpperCase()
    let x = getData();
    let y = x["projects"];
    let arr = [];
    y.map(z => {
        let a = z.proname;
        let b = a.toUpperCase()
        if (b.includes(n)) {
            arr.push(z);
        }
    })
    let main = document.getElementById("mypro1");
    let div = document.getElementById("mypro2");
    main.removeChild(div);
    let div2 = document.createElement("div");
    div2.id = "mypro2"
    div2.setAttribute("class", "container p-5");
    let as = { "projects": arr }
    showTask(div2, as);

    main.appendChild(div2);
}

function newPro() {
    let mainDiv = document.getElementById("mypro2");
    // let mainBody = document.getElementById("mypro1");
    mainDiv.textContent = "";
    let div1 = document.createElement("div");
    let formt = document.createElement("form");
    formt.id = "myform";
    formt.method = "POST";
    // div1.setAttribute("style", "border: 1px solid black;" )
    div1.setAttribute("class", "w-50 m-auto pt-5")

    let y = [
        { 'labelName': " Enter project name", "inputType": 'text', 'for': 'proName', "eid": "pnErr", "onkeyup1": "pna()" },
        { 'labelName': "Description of the project", "inputType": 'text', 'for': 'proDesc', "eid": "pnDErr", "onkeyup1": "pnda()" },
        { 'labelName': "Search team", "inputType": 'text', 'for': 'team', "onkeyup1": "myTeam()", "eid": "pnUErr" }
    ]

    y.map(x => {
        let div2 = document.createElement("div");
        div2.setAttribute("class", "form-group");
        let labelT = document.createElement("label");
        let inputT = document.createElement("input");
        labelT.setAttribute("for", x.for);
        labelT.textContent = x.labelName;
        inputT.id = x.for;
        inputT.setAttribute("onkeyup", x.onkeyup1)
        inputT.setAttribute("class", "form-control");
        inputT.name = x.inputType;
        div2.appendChild(labelT)
        let sm = document.createElement("small");
        sm.id = x.eid;

        div2.appendChild(inputT)
        div2.appendChild(sm)
        div1.appendChild(div2);
    });
    let udiv = document.createElement("div");
    udiv.id = "selectUser";
    udiv.setAttribute("style", 'border: 1px solid; margin: 10px 0px; padding-left: 2px')
    let ubtn = document.createElement("span");
    ubtn.id = "schRes"
    ubtn.className = "btn btn-light btn-sm"
    ubtn.setAttribute("onclick", 'setRem(this)')
    div1.appendChild(ubtn);
    let te = document.createElement("div");
    te.innerHTML = "<strong>My Team</strong>"
    div1.appendChild(te);
    div1.appendChild(udiv);

    let btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "create"
    btn.setAttribute("class", "btn btn-outline-success btn-lg")
    btn.setAttribute("style", "padding: 0 5px")
    btn.onclick = () => {
        if (proValidate()) {
            console.log("done")
            addTask()
        }
        else {
            return false
        }
    }
    div1.appendChild(btn);
    formt.appendChild(div1)

    mainDiv.appendChild(formt);

}

function proValidate() {
    if (pna() && pnda()) {
        if (sessionStorage.length > 0) {
            let pname = document.getElementById("proName").value;
            let pDesc = document.getElementById("proDesc").value;
            let team = document.getElementById("selectUser").innerText;
            let nTem = team.split(" ");
            let mydata = getData();
            let x = { "proName": pname, "proDesc": pDesc, "myTeam": nTem, "tasks": [] };
            mydata.projects.push(x);
            proUp(mydata)

            for (let i = 1; i <= localStorage.length; i++) {
                let hj = JSON.parse(localStorage.getItem(i))
                if (nTem.includes(hj.Username)) {
                    // console.log("yes");
                    let x2 = { "giveById": JSON.parse(sessionStorage.getItem("ide")), "proName": pname, "proDesc": pDesc, "tasks": [] };
                    hj.Task.push(x2)
                    let sd = JSON.stringify(hj)
                    localStorage.setItem(i, sd);
                }

            }


            return true
        }
        else {
            let x = document.getElementById("mypro2");
            x.innerHTML = "<strong>Login first</strong>"
            return false
        }

    }
    else {
        return false
    }

}

function proUp(z) {
    if (sessionStorage.length > 0) {
        let x = JSON.parse(sessionStorage.getItem("ide"));
        let n = JSON.stringify(z)
        localStorage.setItem(x, n)
    }
}


function pna() {
    let pe = document.getElementById("pnErr");
    pe.setAttribute("style", "color:red;");
    let pn = document.getElementById("proName").value;
    if (pn.length == 0) {
        pe.textContent = "*field required"
        return false;
    }
    else {
        pe.textContent = ""
        return true;
    }

}
function pnda() {
    let pe = document.getElementById("pnDErr");
    pe.setAttribute("style", "color:red;");
    let pn = document.getElementById("proDesc").value;
    if (pn.length == 0) {
        pe.textContent = "*field required"
        return false;
    }
    else {
        pe.textContent = ""
        return true;
    }
}
function setRem(x) {

    let place = document.getElementById("selectUser");
    let team = document.getElementById("team");
    let aw = place.innerText;
    let newAw = aw.split(" ")
    if (!newAw.indexOf(x.value)) {
        x.value = "Already exist!!!"
        return 0
    }
    let xx = place.innerText;
    place.textContent = xx + " " + x.value;
    x.textContent = "";
    x.value = "";
    team.value = "";
    x.setAttribute("style", "display: none;")
}

function myTeam() {
    let x = document.getElementById("team").value;
    let se = document.getElementById("schRes");
    for (let i = 1; i <= localStorage.length; i++) {
        let a = JSON.parse(localStorage.getItem(i))
        let f = a["Username"]
        if (f == x) {
            se.setAttribute("style", "display: block;")
            se.textContent = x;
            se.value = x
        }
    }
};

function signup() {
    if (!document.getElementById("div1")) {
        if (document.getElementById("mypro2")) {
            let tt = document.getElementById("mypro2");
            tt.remove()
        }
        let main = document.getElementById("mainBody");
        let maindiv = document.createElement("div");
        maindiv.id = "div1"
        maindiv.setAttribute("style", "padding-top: 65px;")
        let swa = document.createElement("h1");
        swa.setAttribute("style", " text-align: center;");
        swa.textContent = "SignUp page";
        let mDiv = document.createElement("div");
        maindiv.appendChild(mDiv);
        maindiv.appendChild(swa)
        let formt = document.createElement("form");
        formt.method = "POST";
        formt.id = "form"

        let div1 = document.createElement("div");

        let y = [
            { 'labelName': " Enter your name", "inputType": 'text', 'for': 'uName', "ph": "name", "sid": 'nErr', "ve": 'nameCheck()' },
            { 'labelName': "Enter username", "inputType": 'text', 'for': 'username', "ph": "username", "sid": 'unErr', "ve": 'unameCheck()' },
            { 'labelName': "password", "inputType": 'password', 'for': 'pass', "ph": "password", "sid": 'pErr', "ve": 'passCheck()' }
        ]


        y.map(x => {
            let div2 = document.createElement("div");
            div2.setAttribute("class", "form-group w-50 m-auto");
            let labelT = document.createElement("label");
            let inputT = document.createElement("input");
            labelT.setAttribute("for", x.for);
            labelT.textContent = x.labelName;
            inputT.id = x.for;
            inputT.type = x.inputType;
            inputT.setAttribute("onkeyup", x.onkeyup1)
            inputT.setAttribute("class", "form-control");
            inputT.name = x.inputType;
            inputT.placeholder = x.ph
            inputT.setAttribute("onkeyup", x.ve);
            div2.appendChild(labelT)
            div2.appendChild(inputT)
            let spanT = document.createElement("small");
            spanT.id = x.sid;
            div2.appendChild(spanT);
            div1.appendChild(div2);
        });
        let bd = document.createElement("div");
        let bb = document.createElement("button");
        bd.setAttribute("class","form-group w-50 m-auto");
        bd.setAttribute("style", " padding: auto; padding-top: 20px;");
        bb.textContent = "submit"
        bb.type = "submit"

        bb.setAttribute("class", "btn btn-success m-auto");
        bb.onclick = () => {
            if (validate(mDiv)) {
                login()
            }
            else {
                return false
            }
        }
        bd.appendChild(bb);
        div1.appendChild(bd)
        maindiv.appendChild(div1)

        try {
            formt.appendChild(maindiv);
            main.appendChild(formt)
        } catch (error) {
        }

    }
    else {
        let f = document.getElementById("div1")
        f.remove();
        signup();
    }
}

function validate(ol) {
    // {
    //     "Name" : name,
    //     "Username" : uname,
    //     "Password" : pass,
    //     "Task" : [],
    //     "projects" : [],
    // }
    let pass = document.getElementById("pass").value;
    let uname = document.getElementById("uName").value;
    let username = document.getElementById("username").value;

    if (nameCheck() && unameCheck() && passCheck()) {

        let obj = {
            "Name": uname,
            "Username": username,
            "Password": pass,
            "Task": [],
            "projects": [],
        }
        let JObj = JSON.stringify(obj);
        let sDiv = document.createElement("div");
        sDiv.setAttribute("class", "alert alert-success")
        sDiv.innerHTML = "<strong>Signup!</strong>successful"
        ol.appendChild(sDiv);
        localStorage.setItem(localStorage.length + 1, JObj);
        return true;
    }
    else {
        let sDiv = document.createElement("div");
        sDiv.setAttribute("class", "alert alert-danger")
        sDiv.innerHTML = "<center><strong>Invalid Credentials!!!</strong></center>"
        ol.appendChild(sDiv);
        return false;
    }
}

function passCheck() {
    let pass = document.getElementById("pass").value;
    let es = document.getElementById('pErr');
    es.style.color = "red";
    if (pass.length == 0) {
        es.textContent = "*field required"
        return false
    }
    else if (pass.length > 12 || pass.length < 4) {
        if (pass.length > 12) {
            es.textContent = "password is too long!"
            return false
        }
        else {
            es.textContent = "password is too short"
            return false
        }

    }
    else {
        let x = false;
        for (let i = 0; i < pass.length; i++) {
            let a = pass[i];
            if (a == "@" || a == "!" || a == "$" || a == "#") {
                x = true;
            }
        }
        if (x) {
            es.textContent = "";
            return true
        }
        else {
            es.textContent = "use one of this symbols '@' '#' '$' '!' "
            return false
        }

    }
}

function nameCheck() {
    let uname = document.getElementById("uName").value;
    let es = document.getElementById('nErr');
    es.setAttribute("style", "color: red;")
    if (uname.length == 0) {
        es.textContent = "*field required"
        return false
    }


    else {
        es.textContent = ""
        return true
    }
}
function unameCheck() {
    let username = document.getElementById("username").value;
    let es = document.getElementById('unErr');
    es.setAttribute("style", "color: red;")
    if (username.length == 0) {
        es.textContent = "*field required"
        return false
    }
    else if (username.length > 10 || username.length < 4) {
        if (username.length > 10) {
            es.textContent = "lenght too large"
        }
        else {
            es.textContent = "lenght too short"
        }
        return false
    }
    else {
        es.textContent = ""
        return true
    }
}

function login() {
    if (!document.getElementById("div1")) {
        if (document.getElementById("mypro2")) {
            let tt = document.getElementById("mypro2");
            tt.remove()
        }
        let main = document.getElementById("mainBody");
        let maindiv = document.createElement("div");
        maindiv.id = "div1"
        maindiv.setAttribute("style", "padding-top: 65px;")
        let swa = document.createElement("h1");
        swa.setAttribute("style", " text-align: center;");
        swa.textContent = "Login page";
        let mDiv = document.createElement("div");
        maindiv.appendChild(mDiv);
        maindiv.appendChild(swa)
        let formt = document.createElement("form");
        formt.method = "POST";
        formt.id = "form"

        let div1 = document.createElement("div");

        let y = [
            // { 'labelName': " Enter your name", "inputType": 'text', 'for': 'uName', "ph": "name", "sid": 'nErr', "ve": 'nameCheck()' },
            { 'labelName': "Enter username", "inputType": 'text', 'for': 'username', "ph": "username", "sid": 'unErr', "ve": 'unameCheck()' },
            { 'labelName': "password", "inputType": 'password', 'for': 'pass', "ph": "password", "sid": 'pErr', "ve": 'passCheck()' }
        ]


        y.map(x => {
            let div2 = document.createElement("div");
            div2.setAttribute("class", "form-group w-50 m-auto");
            let labelT = document.createElement("label");
            let inputT = document.createElement("input");
            labelT.setAttribute("for", x.for);
            labelT.textContent = x.labelName;
            inputT.id = x.for;
            inputT.type = x.inputType;
            inputT.setAttribute("onkeyup", x.onkeyup1)
            inputT.setAttribute("class", "form-control");
            inputT.name = x.inputType;
            inputT.placeholder = x.ph
            inputT.setAttribute("onkeyup", x.ve);
            div2.appendChild(labelT)
            div2.appendChild(inputT)
            let spanT = document.createElement("small");
            spanT.id = x.sid;
            div2.appendChild(spanT);
            div1.appendChild(div2);
        });
        let bd = document.createElement("div");
        let bb = document.createElement("button");
        bd.setAttribute("class","form-group w-50 m-auto");
        bd.setAttribute("style", " padding: auto; padding-top: 20px;");
        bb.textContent = "login"
        bb.type = "button"

        bb.setAttribute("class", "btn btn-success m-auto");
        bb.onclick = () => {
            if (authUser(mDiv)) {
                home();
            }
            else {
                return false
            }
        }
        bd.appendChild(bb);
        div1.appendChild(bd)
        maindiv.appendChild(div1)
        formt.appendChild(maindiv);
        main.appendChild(formt)
    }
    else {
        let f = document.getElementById("div1")
        f.remove();
        login();
    }
}



function authUser(ver) {
    let x = document.getElementById("username").value;
    let y = document.getElementById("pass").value;
    for (let i = 1; i <= localStorage.length; i++) {
        let a = JSON.parse(localStorage.getItem(i));
        if (x == a["Username"] && y == a["Password"]) {
            sessionStorage.setItem("ide", i)
            return true;
        }
    }
    let sDiv = document.createElement("div");
    sDiv.setAttribute("class", "alert alert-danger")
    sDiv.innerHTML = "<center><strong>Invalid Credentials!!!</strong></center>"
    ver.appendChild(sDiv);
    return false
}


// {projects: [{sno: 1, proname: "web-1"}, {sno: 2, proname: "web-2"}, {sno: 3, proname: "web-2"}]}

