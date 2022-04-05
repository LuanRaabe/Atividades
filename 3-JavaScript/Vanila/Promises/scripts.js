const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("teste"), 2000);
});

promise1.then(
    (res) => {
        console.log("resolvido ", res);
    },
    (rej) => {
        console.log("rejeitado ", rej);
    }
);

const promise2 = new Promise((resolve, reject) => {
    if (Math.random() > 0.5) resolve("yay");
    reject("no");
});

promise2.then(console.log).catch(console.error);
