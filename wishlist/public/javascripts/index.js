const DOM = {
    addEvents() {
        if (window.location.href.includes("wishlist"))
            Wishlist.addEvent(".remove");
        else
            Wishlist.addEvent(".favorite");
    },
}

const Wishlist = {
    list() {
        let data = Utils.fetch("/api/wishlist", "GET").then(json => json);
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

    async active() {
        let favoriteProducts = await this.list();
        favoriteProducts.forEach(e => {
            document.getElementById(e).children[0].classList.add("favorite--selected");
        })
    }

}

const Utils = {
    fetch(url, type, body = null) {
        return fetch(url, {
                "method": type,
                "headers": {},
                "body": body
            })
            .then(response => response.json())
            .catch(err => {
                console.error(err);
            });
    }
}

const App = {
    init() {
        DOM.addEvents();
        this.home();
    },
    home() {
        if (!window.location.href.includes("wishlist"))
            Wishlist.active();
    },
}

window.onload = App.init();