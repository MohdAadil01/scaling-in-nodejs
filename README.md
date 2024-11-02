# Node.js Process Scaling with Cluster Module

This project demonstrates how to scale a Node.js process using the `cluster` module to efficiently utilize multiple CPU cores. By forking worker processes, the application can handle higher loads and achieve improved performance on multi-core systems.

![Screenshot 2024-11-02 114611](https://github.com/user-attachments/assets/f030614c-85cf-4c45-a270-f37d09471776)

## Project Overview

In this example, the application is a basic Express server that spawns multiple worker processes based on the number of CPU cores available. Each worker handles incoming requests independently, allowing the server to better manage computationally intensive tasks and prevent single-threaded bottlenecks.

## How It Works

1. **Primary Process**: 
   - The primary process (`isPrimary`) spawns a worker process for each available CPU core.
   - If a worker process exits, the primary process listens for the exit event and forks a new worker to replace it.

2. **Worker Process**: 
   - Each worker process runs an instance of an Express server, handling requests and executing tasks.
   - When a request is sent to the `/api/:n` endpoint, the worker calculates a count based on the input number `n`.

## Code

The main logic for clustering and scaling is implemented in src/index.ts file
