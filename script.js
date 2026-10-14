const numberInput = document.getElementById("number");
const fromBase = document.getElementById("fromBase");
const toBase = document.getElementById("toBase");
const result = document.getElementById("result");
const message = document.getElementById("message");

document.getElementById("convertBtn").addEventListener("click", () => {
    const input = numberInput.value.trim();
    const from = Number(fromBase.value);
    const to = Number(toBase.value);

    message.textContent = "";

    if (!input) {
        result.textContent = "Please enter a number.";
        return;
    }

    // Allow an optional leading minus sign.
    const digits = input.replace(/^-/, "");
    const validDigits = {
        2: /^[01]+$/,
        8: /^[0-7]+$/,
        10: /^[0-9]+$/,
        16: /^[0-9a-fA-F]+$/
    };

    if (!validDigits[from].test(digits)) {
        result.textContent = "Invalid number for the selected base.";
        return;
    }

    const value = parseInt(input, from);

    if (!Number.isSafeInteger(value)) {
        result.textContent =
            "Number is too large for this converter.";
        return;
    }

    result.textContent = value.toString(to).toUpperCase();
});

document.getElementById("copyBtn").addEventListener("click", async () => {
    const output = result.textContent;

    if (
        !output ||
        output === "Please enter a number." ||
        output === "Invalid number for the selected base." ||
        output === "Number is too large for this converter." ||
        output === "Your result will appear here."
    ) {
        message.textContent = "Convert a number first.";
        return;
    }

    try {
        await navigator.clipboard.writeText(output);
        message.textContent = "Result copied!";
    } catch {
        message.textContent =
            "Copy is unavailable. Please select and copy the result.";
    }
});
