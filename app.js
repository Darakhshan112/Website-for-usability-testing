const express = require("express")
const app = express()
const path = require("path")
require("./db/conn")
const port = process.env.PORT || 3000
const static_path = path.join(__dirname, "/public")
// console.log(static_path)
// const template_path = path.join(__dirname, "../templates/views")
// const partials_path = path.join(__dirname, "../templates/partials")
const Student = require("./models/students")
const Log = require("./models/logsModel")
const cookieParser = require("cookie-parser")
// const flash = require('connect-flash');
// app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

// app.set("view engine", "hbs")
app.set('views', path.join(__dirname, '/views'));
// console.log( path.join(__dirname, '/views'))
app.set('view engine', 'ejs');
// app.set("views", template_path)
// hbs.registerPartials(partials_path)
app.use(express.static(static_path))
function saveLogs(username, eventOccur) {
    const userlog = new Log({
        username: username,
        userevent: eventOccur

    })
    return userlog
}
function setCache(res) {
    res.setHeader('Cache-Control', "no-store")
}
app.get("/", async (req, res) => {
    setCache(res)
    var cookie = req.cookies.username;
    if (cookie === undefined) {
        res.render("index")
    } else {
        res.redirect("/showStudentPage")
    }
})

app.post("/", async (req, res) => {
    const { username } = req.body
    res.cookie("username", username)
    setCache(res)
    // const userlog = saveLogs(username, "StartButton")
    // await userlog.save()
    res.status(201).redirect("/showStudentPage")
})
app.get("/showStudentPage", async (req, res) => {
    setCache(res)

    if (req.cookies.username === undefined) {
        res.redirect("/")
    } else {
        // const userlog = saveLogs(req.cookies.username,"ShowStudentPage")
        // await userlog.save()
        await Student.find({}, function (err, docs) {
            if (!err) {
                res.render("showStudentPage", {
                    data: docs

                })
            } else {
                console.log("failed" + err)
            }
        }).clone().catch(function (err) { console.log(err) })

    }

})



app.get("/addStudentButton", async (req, res) => {
    setCache(res)
    // const userlog = saveLogs(req.cookies.username, "AddStudentButton")
    // await userlog.save()
    res.redirect("/addStudentPage")
})
app.get("/addStudentPage", async (req, res) => {
    setCache(res)
    if (req.cookies.username === undefined) {
        res.redirect("/")
    } else {
        res.render("addStudentPage")
        // const userlog = saveLogs(req.cookies.username, "AddStudentPage")
        // await userlog.save()
    }

})
app.post("/addStudentPage", async (req, res) => {
    setCache(res)
    try {
        const RegisterEmployee = new Student({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })
        await RegisterEmployee.save()
        // const userlog = saveLogs(req.cookies.username, "SubmitButton")
        // await userlog.save()
        res.status(201).redirect("/showStudentPage")
    } catch (error) {
        res.status(400).send(error)

    }
})


app.get("/deleteStudentPage", async (req, res) => {
    setCache(res)
    if (req.cookies.username === undefined) {
        res.redirect("/")
    } else {

        // const userlog = saveLogs(req.cookies.username, "DeleteStudentPage")
        // await userlog.save()

        await Student.find({}, function (err, docs) {
            if (!err) {
                res.render("deleteStudentPage", {
                    data: docs

                })
            } else {
                console.log("failed" + err)
            }
        }).clone().catch(function (err) { console.log(err) })


    }


})






app.get("/deleteStudentButton", async (req, res) => {
    setCache(res)
    // const userlog = saveLogs(req.cookies.username, "DeleteStudentButton")
    // await userlog.save()
    res.redirect("/deleteStudentPage")
})

app.get("/showReportButton", async (req, res) => {
    setCache(res)
    // const userlog = saveLogs(req.cookies.username, "ReportButton")
    // await userlog.save()
    res.redirect("/reportPage")
})
app.get("/reportPage", async (req, res) => {
    setCache(res)
    if (req.cookies.username === undefined) {
        res.redirect("/")
    } else {
        res.render("reportPage")
        // const userlog = saveLogs(req.cookies.username, "ReportPage")
        // await userlog.save()
    }


})

app.get("/showAboutButton", async (req, res) => {
    setCache(res)
    // const userlog = saveLogs(req.cookies.username, "AboutButton")
    // await userlog.save()
    res.redirect("/aboutPage")
})
app.get("/aboutPage", async (req, res) => {
    setCache(res)
    if (req.cookies.username === undefined) {
        res.redirect("/")
    } else {
        res.render("aboutPage")
        // const userlog = saveLogs(req.cookies.username, "AboutPage")
        // await userlog.save()
    }


})

app.get("/faqButton", async (req, res) => {
    setCache(res)
    // const userlog = saveLogs(req.cookies.username, "FAQButton")
    // await userlog.save()
    res.redirect("/faqPage")
})
app.get("/faqPage", async (req, res) => {
    setCache(res)
    if (req.cookies.username === undefined) {
        res.redirect("/")
    } else {
        res.render("faqPage")
        // const userlog = saveLogs(req.cookies.username, "FAQPage")
        // await userlog.save()
    }

})

app.get("/questionBtn", async (req, res) => {
    setCache(res)
    // const userlog = saveLogs(req.cookies.username, "QuestionButton")
    // await userlog.save()
    res.redirect("/detailQuestions")
})

app.get("/detailQuestions", async (req, res) => {
    setCache(res)
    if (req.cookies.username === undefined) {
        res.redirect("/")
    } else {
        res.render("detailQuestions")
        // const userlog = saveLogs(req.cookies.username, "DetailQuestionPage")
        // await userlog.save()
    }
})

app.get("/backButton", async (req, res) => {
    setCache(res)
    // const userlog = saveLogs(req.cookies.username, "BackButton")
    // await userlog.save()
    res.redirect("/aboutPage")
})


app.listen(port, () => {
    console.log(`Server run at port ${port}`)
})