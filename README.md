
# tynel

`tynel` is a simple command-line tool for creating reverse SSH tunnels. It allows you to expose your local services to the internet using a subdomain format like `remotePort.tunnel.technobabble.hr`.

## Features

- Takes two arguments: a **remote port** and a **local port**.
- Outputs the generated tunnel URL in the format: `remotePort.tunnel.technobabble.hr`.
- If the specified remote port is already taken, it will display a friendly message: "This subdomain is already taken, try another one."

## Installation

You can install `tynel` globally using npm:

## Usage

To create a tunnel, run the command with the remote and local port as arguments:

```bash
npx tynel <remotePort> <localPort>
```

Where:
- `<remotePort>` is the port you want to use on the remote server.
- `<localPort>` is the local port you want to expose.

The tool will generate a URL in the form of `remotePort.tunnel.technobabble.hr` for successful tunnel creation.

## Example Usage

### Example 1: Successful Tunnel Creation

```bash
npx tynel 10001 3000
```

**Output:**

```plaintext
Tunnel created successfully! Access your local service at: 10001.tunnel.technobabble.hr
```

### Example 2: Another Successful Tunnel Creation

```bash
npx  tynel 10002 8080
```

**Output:**

```plaintext
Tunnel created successfully! Access your local service at: 10002.tunnel.technobabble.hr
```

### Example 3: Failed Tunnel Creation (Port Already Taken)

```bash
npx tynel 10001 5000
```

**Output:**

```plaintext
This subdomain is already taken, try another one.
```

## Author
Ivo Katunaric
