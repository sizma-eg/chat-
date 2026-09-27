self.addEventListener("push", event => {
    let data = {};

    try {
        data = event.data ? event.data.json() : {};
    } catch (error) {
        data = {
            title: "Chat+",
            body: "لديك رسالة جديدة"
        };
    }

    const title = data.title || "Chat+";

    const options = {
        body: data.body || "لديك رسالة جديدة",
        icon: "/chat-/icon-192.png",
        badge: "/chat-/icon-192.png",
        tag: data.tag || "chatplus-message",
        data: {
            url: data.url || "/chat-/"
        },
        vibrate: [200, 100, 200]
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});


self.addEventListener("notificationclick", event => {

    event.notification.close();

    const url =
        event.notification?.data?.url ||
        "/chat-/";

    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then(clientList => {

            for (const client of clientList) {

                if ("focus" in client) {
                    client.navigate(url);
                    return client.focus();
                }
            }

            if (clients.openWindow) {
                return clients.openWindow(url);
            }

        })
    );
});
