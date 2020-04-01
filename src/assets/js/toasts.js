/* eslint-disable no-shadow, no-use-before-define */
window.showToast = function showToast(message, displayLength, action, actionHandler) {
    let container = document.getElementById("toast-container");

    // Create toast container if it does not exist
    if (container === null) {
        // create notification container
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }

    function createToast(html, action, actionHandler) {
        // Create toast
        const toast = document.createElement("div");
        toast.classList.add("toast");

        // If type of parameter is HTML Element
        if (typeof HTMLElement === "object" ? html instanceof HTMLElement : html && typeof html === "object" && html !== null && html.nodeType === 1 && typeof html.nodeName === "string") {
            toast.appendChild(html);
        } else if (action) {
            const span = document.createElement("span");
            span.innerHTML = html;

            const actionButton = document.createElement("button");
            actionButton.innerHTML = action;
            actionButton.classList.add("btn-flat");
            actionButton.classList.add("toast-action");
            if (actionHandler) {
                actionButton.addEventListener("click", () => {
                    timeLeft = 0;
                    actionHandler();
                });
            }

            toast.appendChild(span);
            toast.appendChild(actionButton);
        } else {
            // Insert as text;
            toast.innerHTML = html;
        }

        return toast;
    }

    // Select and append toast
    const newToast = createToast(message, action, actionHandler);

    // only append toast if message is not undefined
    if (message) {
        container.appendChild(newToast);
    }

    newToast.style.opacity = 0;

    // Animate toast in
    newToast.style.transition = "all .3s";
    setTimeout(() => {
        newToast.style.transform = "translateY(-35px)";
        newToast.style.webkitTransform = "translateY(-35px)";
        newToast.style.mozTransform = "translateY(-35px)";
        newToast.style.oTransform = "translateY(-35px)";
        newToast.style.msTransform = "translateY(-35px)";
        newToast.style.opacity = 1;
    }, 10);


    let timeLeft = displayLength;
    let counterInterval;
    if (timeLeft !== null) {
        counterInterval = setInterval(() => {
            if (newToast.parentNode === null) {
                window.clearInterval(counterInterval);
            }

            timeLeft -= 20;

            if (timeLeft <= 0) {
                // Animate toast out
                newToast.style.transform = "translateY(0px)";
                newToast.style.webkitTransform = "translateY(0px)";
                newToast.style.mozTransform = "translateY(0px)";
                newToast.style.oTransform = "translateY(0px)";
                newToast.style.msTransform = "translateY(0px)";

                newToast.style.opacity = 0;
                setTimeout(() => {
                    // Remove toast after it times out
                    newToast.parentNode.removeChild(newToast);
                }, 300);

                window.clearInterval(counterInterval);
            }
        }, 20);
    }
};
