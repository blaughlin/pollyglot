
document.addEventListener("DOMContentLoaded", () => {

    const submitBtn = document.getElementById("translate");
    if (submitBtn) {
        submitBtn.addEventListener("click", async () => {
            console.log("Button clicked!");


            await getAIResponse();
        });
    }
});

const startOverBtn = document.getElementById("startOver");
if (startOverBtn) {
    startOverBtn.addEventListener("click", () => {
        document.getElementById("result-area").style.display = "none";
        document.getElementById("translation-area").style.display = "block";
        document.getElementById("language").style.display = "block";
        document.getElementById("translate").style.display = "block";
        document.getElementById("output").value = "";
        document.getElementById("output").value = "";

        document.getElementById("top-text").innerText = "Text to translate 👇";
    });
}

async function getAIResponse() {
    let selectedLanguage = document.querySelector('input[name="language"]:checked')?.value;

    const prompt = `You are a ${selectedLanguage} translator. Translate the following text: "` + document.getElementById("input").value + '" to ' + `${selectedLanguage}. Do not explain anything just give the translation`
    console.log("Prompt:", prompt);

    try {
        const response = await fetch("https://backend-fyif.onrender.com/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        const data = await response.json();
        console.log(data.message)
        if (data && data.message) {
            document.getElementById("result-area").style.display = "block";
            document.getElementById("translation-area").style.display = "none";
            document.getElementById("language").style.display = "none";
            document.getElementById("translate").style.display = "none";
            document.getElementById("output").value = data.message;
            document.getElementById("top-text").innerText = "Original text 👇";

        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("input").innerText = "Failed to fetch response.";
    }
}