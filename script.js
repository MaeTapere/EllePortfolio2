document.addEventListener("DOMContentLoaded", function () {
    // Job Titles Click Functionality
    const jobTitles = document.querySelectorAll(".jobTitle li");
    const jobDetails = document.querySelectorAll(".jobContent");
    const experienceContainer = document.querySelector(".experienceContainer");

    // Create a single highlight bar (avoid duplicates)
    let highlightBar = document.querySelector(".highlightBar");
    if (!highlightBar) {
        highlightBar = document.createElement("div");
        highlightBar.classList.add("highlightBar");
        experienceContainer.appendChild(highlightBar);
    }

    // Function to move the highlight bar
    function moveHighlightBar(target) {
        const titleTop = target.offsetTop;
        highlightBar.style.top = `${titleTop}px`;
    }

    // Set initial active job and highlight bar position
    const firstActive = jobTitles[0];
    firstActive.classList.add("active");
    document.getElementById(firstActive.getAttribute("data-job")).classList.add("active");
    moveHighlightBar(firstActive);

    jobTitles.forEach(title => {
        title.addEventListener("click", function () {
            // Remove active class from all, then add to clicked one
            jobTitles.forEach(item => item.classList.remove("active"));
            jobDetails.forEach(detail => detail.classList.remove("active"));

            this.classList.add("active");

            const jobId = this.getAttribute("data-job");
            document.getElementById(jobId).classList.add("active");

            // Move the highlight bar
            moveHighlightBar(this);
        });
    });

    // Tooling Carousel Functionality
    const toolsWrapper = document.querySelector(".tools-wrapper");
    const toolsList = document.querySelector(".tools");
    const tools = Array.from(toolsList.children);

    let isPaused = false;
    let speed = 0.2; // Adjust for faster/slower movement

    // Clone images to create an infinite loop effect
    tools.forEach(tool => {
        const clone = tool.cloneNode(true);
        toolsList.appendChild(clone);
    });

    let position = 0;

    function animate() {
        if (!isPaused) {
            position -= speed;
            toolsList.style.transform = `translateX(${position}px)`;

            // Reset position when half of the list has moved out of view
            if (Math.abs(position) >= tools[0].offsetWidth * tools.length) {
                position = 0;
            }
        }
        requestAnimationFrame(animate);
    }

    // Pause scrolling on hover
    toolsWrapper.addEventListener("mouseenter", () => isPaused = true);
    toolsWrapper.addEventListener("mouseleave", () => isPaused = false);

    animate();
});
