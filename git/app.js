const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const port = process.env.PORT;
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const { jwtMiddleware, generateToken } = require("./jwt");

app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
    if (user)
      return res.send({
        message: "User Exist",
      });

    const newuser = await prisma.Users.create({
      data: {
        username: username,
        password: password,
      },
    });
    const token = generateToken({ username });
    res.send({ token });
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.Users.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      return res.status(401).send("Invalid username ");
    }

    if (user.password !== password) {
      return res.status(401).send("Invalid password");
    }
    const token = generateToken({ username });
    // console.log(token);
    res.json({ username, token });
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
});

app.get("/api/getAll", jwtMiddleware, async (req, res) => {
  const username = req.username.username;
  // console.log(username);
  try {
    const usersTask = await prisma.tasks.findMany({
      where: {
        authorname: username,
      },
    });
    res.send(usersTask);
    // console.log(usersTask);
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
});

app.post("/api/createTask/", jwtMiddleware, async (req, res) => {
  // const username = req.username.username;
  const { description, title, username } = req.body;
  // console.log(title);
  try {
    const newTask = await prisma.tasks.create({
      data: {
        authorname: username,
        title: title,
        description: description,
      },
    });
    res.send(newTask);
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
});

app.delete("/api/deleteTask/:id", jwtMiddleware, async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const deletedTodo = await prisma.tasks.delete({
      where: {
        id: id,
      },
    });
    // console.log(deletedTodo);
    res.status(200).json(deletedTodo);
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
});

app.patch("/api/status/:id", jwtMiddleware, async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const currentTodo = await prisma.tasks.findUnique({
      where: {
        id: id, // Ensure it's the correct type
      },
    });

    // if (!currentTodo) {
    //   return res.status(404).json({ error: "Todo not found" });
    // }

    // Toggle the status (invert the current status)
    const updatedTodo = await prisma.tasks.update({
      where: {
        id: id,
      },
      data: {
        status: !currentTodo.status, // Toggle the status
      },
    });

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
  }
});

app.listen(port, () => {
  console.log(`The server is live at http://localhost:${port}`);
});
