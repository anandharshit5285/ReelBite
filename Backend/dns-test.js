const dns = require("dns");

console.log("Start");

dns.resolveSrv("_mongodb._tcp.cluster0.a0dvgp7.mongodb.net", (err, records) => {
  console.log("Callback executed");

  if (err) {
    console.error("Error:");
    console.error(err);
  } else {
    console.log("Records:");
    console.log(records);
  }
});

setTimeout(() => {
  console.log("Timeout finished");
}, 5000);
