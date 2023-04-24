let scrollButton = document.querySelector(`section.intro .btn`)
scrollButton.addEventListener("click", e => {
	e.preventDefault()
	window.scroll({
		top: window.innerHeight,
		behavior: "smooth",
	})
})
