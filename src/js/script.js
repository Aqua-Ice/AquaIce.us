let introSection = document.querySelector("section.intro")
let header = document.querySelector("header")
let scrollButton = introSection.querySelector(`.btn`)


scrollButton.addEventListener("click", e => {
	e.preventDefault()
	window.scroll({
		top: introSection.offsetHeight - header.offsetHeight - 15,
		behavior: "smooth",
	})
})

function onScroll() {
    if (window.scrollY >= 50) header.classList.add("scrolled")
    else header.classList.remove("scrolled")
}
window.addEventListener("scroll", onScroll)
setInterval(onScroll, 1000)