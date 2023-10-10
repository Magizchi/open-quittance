<script>
	import { saveAs } from 'file-saver';
	import { Buffer } from 'buffer';
	/**
	 * @type {{ data: any; }}
	 */
	export let data;
	/**
	 * @type {any}
	 */
	let pdfBuffer;
	async function getParams() {
		let response = await fetch(`/todo`).then((data) => data.text());
		pdfBuffer = response;
	}

	const save = () => {
		var buf = Buffer.from(pdfBuffer, 'base64');
		var blob = new Blob([buf], { type: 'application/pdf' });
		saveAs(blob, 'hello-world.pdf');
	};

	console.log('data', data);
</script>

<button on:click={() => getParams()}>PDF MAN</button>
<button on:click={() => save()}>DOWNLAD</button>
{@html pdfBuffer}
