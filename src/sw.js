function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const main = async () => {
  const chanel4Broadcast = new BroadcastChannel("someData");
  while (true) {
    try {
      await timeout(300);
      const resp = await fetch("http://192.168.1.104/temperature");
      const data = await resp.json();
      console.log(data.value);
      chanel4Broadcast.postMessage(data);
    } catch (e) {
      console.log(e);
    }
  }
};

main();
