const DOM = {
    addEvents() {
        try {
            if (window.location.href.includes("wishlist"))
                Wishlist.addEvent(".favorite-remove");
            else
                Wishlist.addEvent(".favorite");

            let searchInput = document.querySelector("#search-input");

            searchInput.addEventListener("change", (event) => {
                let content = event.target.value;
                window.location.href = window.location.origin + `/search?content=${content}`;
            });
        } catch (e) {
            console.error("ERROR IN ADD EVENTS: " + e);
        }
    },
}

const Wishlist = {
    list() {
        try {
            let data = Utils.fetch("/api/wishlist", "GET").then(json => json);
            return data;
        } catch (e) {
            console.error("ERROR TO LIST WISHLIST: " + e);
        }
    },

    async request(type, id) {
        if (type == "remove") {
            let url = `/api/${type}-wishlist/${id}`;
            await Utils.fetch(url, "DELETE").then(json => json);
        } else {
            let url = `/api/${type}-wishlist`;
            await Utils.fetch(url, "POST", JSON.stringify({ id })).then(json => json);
        }
    },

    addEvent(selector) {
        try {
            let buttons = document.querySelectorAll(selector);
            buttons.forEach(e => {
                e.addEventListener("click", (event) => {
                    let type = (!selector.match("remove") &&
                        event.currentTarget.classList.toggle("favorite-selected")
                    ) ? "add" : "remove";
                    let id = Number(event.currentTarget.parentElement.id);
                    this.request(type, id);
                    if (selector.match("remove"))
                        window.location.reload();
                })
            })
        } catch (e) {
            console.error("ERROR IN ADD WISHLIST EVENT: " + e);
        }
    },

    async active() {
        try {
            let favoriteProducts = await this.list();
            favoriteProducts.forEach(e => {
                document.getElementById(e).children[0].classList.add("favorite-selected");
            })
        } catch (e) {
            console.error("ERROR IN ACTIVE FAVORITE ITEMS: " + e);
        }
    }

}

const Utils = {
    fetch(url, type, body = null) {
        return fetch(url, {
                "method": type,
                "headers": {
                    "Content-Type": "application/json"
                },
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