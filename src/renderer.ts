class Renderer {

    run() {
        const notice = new Notification('Notice', {
            body: "this is on render process"
        });

        notice.onclick = () => {
            console.log('thisi on render process');
        }

        document.getElementById('drag').ondragstart = (event) => {
            event.preventDefault();
            window['electron'].startDrag('test.txt');
        }
    }

}

const renderer = new Renderer();
renderer.run();