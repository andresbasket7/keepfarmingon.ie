document.addEventListener("DOMContentLoaded", () => {
	const steps = document.querySelectorAll(".timeline-step");
	const progressBar = document.querySelector(".timeline-line .progress");
	const timeline = document.querySelector(".timeline");
	const windowHeight = window.innerHeight;

	window.addEventListener("scroll", () => {
		const windowCenter = windowHeight / 2; // centro de la pantalla
		let activeCount = 0;

		steps.forEach((step, index) => {
			const rect = step.getBoundingClientRect();
			const stepCenter = rect.top + rect.height / 2;

			if (stepCenter < windowCenter + 50) {
				step.classList.add("active");
				activeCount = index + 1;
			} else {
				step.classList.remove("active");
			}
		});

		// Calcular progreso de la línea en base a los pasos activos
		if (steps.length > 0) {
			const totalSteps = steps.length;
			const firstStepRect = steps[0].getBoundingClientRect();
			const lastStepRect = steps[totalSteps - 1].getBoundingClientRect();

			// Distancia total entre el primer y último paso
			const timelineHeight = (lastStepRect.top + lastStepRect.height / 2) - 
			                       (firstStepRect.top + firstStepRect.height / 2);

			// Distancia desde el primer paso hasta el paso activo
			if (activeCount > 0) {
				const activeStepRect = steps[activeCount - 1].getBoundingClientRect();
				const progressHeight = (activeStepRect.top + activeStepRect.height / 2) - 
				                       (firstStepRect.top + firstStepRect.height / 2);

				// Altura en %
				const progressPercent = (progressHeight / timelineHeight) * 100;
				progressBar.style.height = progressPercent + "%";
			} else {
				progressBar.style.height = "0%";
			}
		}
	});
});