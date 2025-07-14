(() => {
  "use strict";
  var e = {
      37: (e) => {
        e.exports = require("mongoose");
      },
      229: function (e, t, s) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const o = a(s(252)),
          n = a(s(577)),
          r = a(s(818)),
          u = a(s(804)),
          i = a(s(740)),
          d = s(510);
        r.default.config();
        const l = (0, o.default)(),
          c = parseInt(process.env.PORT || "5000", 10);
        (0, u.default)(),
          l.use((0, n.default)()),
          l.use(o.default.json()),
          l.get("/", (e, t) => {
            t.json({
              message: "Todo List API is running!",
              endpoints: {
                getTasks: "GET /api/tasks",
                createTask: "POST /api/tasks",
                updateTask: "PUT /api/tasks/:id",
                toggleTask: "PATCH /api/tasks/:id/toggle",
                deleteTask: "DELETE /api/tasks/:id",
              },
            });
          }),
          l.use("/api", i.default),
          l.use(d.notFound),
          l.use(d.errorHandler),
          l.listen(c, () => {
            console.log(`🚀 Server running on http://localhost:${c}`);
          }),
          (t.default = l);
      },
      252: (e) => {
        e.exports = require("express");
      },
      510: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.notFound = t.errorHandler = void 0),
          (t.errorHandler = (e, t, s, a) => {
            const o = e.statusCode || 500,
              n = e.message || "Something went wrong";
            s.status(o).json({ message: n });
          }),
          (t.notFound = (e, t, s) => {
            t.status(404).json({ message: `Route ${e.originalUrl} not found` });
          });
      },
      577: (e) => {
        e.exports = require("cors");
      },
      740: function (e, t, s) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const o = a(s(252)),
          n = s(778),
          r = o.default.Router();
        r.get("/tasks", n.getTasks),
          r.post("/tasks", n.createTask),
          r.put("/tasks/:id", n.updateTask),
          r.patch("/tasks/:id/toggle", n.toggleTask),
          r.delete("/tasks/:id", n.deleteTask),
          (t.default = r);
      },
      778: function (e, t, s) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.deleteTask =
            t.toggleTask =
            t.updateTask =
            t.createTask =
            t.getTasks =
              void 0);
        const o = a(s(926));
        (t.getTasks = async (e, t) => {
          try {
            const e = await o.default.find().sort({ createdAt: -1 });
            t.json(e);
          } catch (e) {
            t.status(500).json({ message: e.message });
          }
        }),
          (t.createTask = async (e, t) => {
            try {
              const {
                  title: s,
                  isCompleted: a = !1,
                  priority: n = "p2",
                } = e.body,
                r = await o.default.create({
                  id: Date.now(),
                  title: s,
                  isCompleted: a,
                  priority: n,
                });
              t.status(201).json(r);
            } catch (e) {
              t.status(400).json({ message: e.message });
            }
          }),
          (t.updateTask = async (e, t) => {
            try {
              const { id: s } = e.params,
                a = e.body,
                n = await o.default.findOneAndUpdate({ id: parseInt(s) }, a, {
                  new: !0,
                });
              if (!n) return t.status(404).json({ message: "Task not found" });
              t.json(n);
            } catch (e) {
              t.status(400).json({ message: e.message });
            }
          }),
          (t.toggleTask = async (e, t) => {
            try {
              const { id: s } = e.params,
                a = await o.default.findOne({ id: parseInt(s) });
              if (!a) return t.status(404).json({ message: "Task not found" });
              a.isCompleted = !a.isCompleted;
              const n = await a.save();
              t.json(n);
            } catch (e) {
              t.status(400).json({ message: e.message });
            }
          }),
          (t.deleteTask = async (e, t) => {
            try {
              const { id: s } = e.params;
              if (!(await o.default.findOneAndDelete({ id: parseInt(s) })))
                return t.status(404).json({ message: "Task not found" });
              t.json({ message: "Task deleted successfully" });
            } catch (e) {
              t.status(400).json({ message: e.message });
            }
          });
      },
      804: function (e, t, s) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.connectDB = void 0);
        const o = a(s(37));
        a(s(818)).default.config();
        const n = process.env.MONGO_URI || "mongodb://localhost:27017/todolist";
        (t.connectDB = async () => {
          try {
            const e = await o.default.connect(n);
            console.log(`MongoDB Connected: ${e.connection.host}`);
          } catch (e) {
            console.error("Error connecting to MongoDB:", e), process.exit(1);
          }
        }),
          (t.default = t.connectDB);
      },
      818: (e) => {
        e.exports = require("dotenv");
      },
      926: function (e, t, s) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const o = a(s(37)),
          n = new o.default.Schema(
            {
              id: { type: Number, required: !0, unique: !0 },
              title: { type: String, required: !0, trim: !0 },
              isCompleted: { type: Boolean, required: !0, default: !1 },
              priority: {
                type: String,
                enum: ["p1", "p2", "p3"],
                default: "p1",
              },
            },
            { timestamps: !0 }
          );
        t.default = o.default.model("Task", n);
      },
    },
    t = {};
  !(function s(a) {
    var o = t[a];
    if (void 0 !== o) return o.exports;
    var n = (t[a] = { exports: {} });
    return e[a].call(n.exports, n, n.exports, s), n.exports;
  })(229);
})();
