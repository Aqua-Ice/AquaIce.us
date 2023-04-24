let scrollButton = document.querySelector(`section.intro .btn`)
console.log(scrollButton)
scrollButton.addEventListener("click", () => {
    console.log("clickety")
    window.scroll({
        top: window.innerHeight,
        behavior: "smooth"
    })
})