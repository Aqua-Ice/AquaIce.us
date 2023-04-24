
let scrollButton = document.querySelector(`section.intro .btn`)
console.log(scrollButton)
scrollButton.addEventListener("click", () => {
    console.log("clickety", window.innerHeight)
    window.scroll({
        top: window.innerHeight,
        // behavior: "smooth"
    })
})