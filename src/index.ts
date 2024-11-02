import express from "express";
import cluster from "cluster";
import os from "os";

const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log("Primary = " + process.pid);
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log("Worker " + process.pid + " died.");
    console.log("forking another worker");
    cluster.fork();
    // usually we do this
    // process.exit()
  });
} else {
  const app = express();
  console.log("Worker " + process.pid + " started.");

  app.get("/", (req, res) => {
    res.send("hi");
  });

  app.get("/api/:n", (req, res) => {
    let n = parseInt(req.params.n);
    if (n > 5000000000) n = 5000000000;
    let count = 0;
    for (let i = 0; i < n; i++) {
      count += i;
    }

    res.send("Final Count " + count + " " + "Process id = " + process.pid);
  });

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
}
