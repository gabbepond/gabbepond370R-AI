<script lang="ts">

    let isSubmitted = false

    function handleSubmit() {
        isSubmitted = true
        console.log('Submitting form...')
    }

</script>

<div class="flex flex-col items-center justify-start m-8">
    <form class="flex flex-col gap-4" method="POST" action="/chat?/uploadFile" enctype="multipart/form-data" onsubmit={handleSubmit}>
        <h2>Choose the data file (in PDF format) you would like to upload</h2>
        <label class="label">
            <span class="label-text">Select a file</span>
            <input class="input" type="file" accept=".pdf" name="file" />
        </label>
        <button class="btn preset-filled-primary-200-800" type="submit">Upload chosen file</button>
    </form>
</div>
 <!-- gabbe -->