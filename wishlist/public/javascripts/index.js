const DOM = {
    addEvents() {
        if (window.location.href.includes("wishlist"))
            Wishlist.addEvent(".remove");
        else
            Wishlist.addEvent(".favorite");
    },

    addClass() {

    }
}

const Wishlist = {
    get() {
        let data = await fetch("http://localhost:3000/api/wishlist", {
                "method": "GET",
                "headers": {}
            })
            .then(response => {
                return response;
            })
            .catch(err => {
                console.error(err);
            });
        return data;
    },

    request(type, id) {

        let url = `/api/${type}-wishlist`;

        fetch(url, {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({ id })
            })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.error(err);
            });
    },

    addEvent(selector) {
        let buttons = document.querySelectorAll(selector);
        buttons.forEach(e => {
            e.addEventListener("click", (event) => {
                let type = (!selector.match("remove") &&
                    event.currentTarget.classList.toggle("favorite--selected")
                ) ? "add" : "remove";
                let id = Number(event.currentTarget.parentElement.id);
                this.request(type, id);
                if (selector.match("remove"))
                    window.location.reload();

            })
        })
    },

    active() {

    }


}

const App = {
    init() {
        DOM.addEvents();
    }
}

window.onload = App.init();