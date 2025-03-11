<script lang="ts">
	import { BlockTypes, type BlockContent, type BlockType } from '$lib/types/Blocks';

	interface Props {
		content: BlockContent;
	}

	let { content }: Props = $props();

	const colors: { [k in BlockType]: string } = {
		[BlockTypes.keyword]: '#78C6A3',
		[BlockTypes.column]: '#67B99A',
		[BlockTypes.table]: '#14746F',
		[BlockTypes.symbol]: '#99E2B4',
		[BlockTypes.number]: '#469D89',
	};
</script>

<div class="block" style="--block-color: {colors[content.type]}" role="textbox" tabindex="-1">
	{content.name}
</div>

<style>
	.block {
		background-color: var(--block-color);
		border-radius: 5px;
		cursor: grab;
		margin: 5px;
		padding: 5px;
		width: fit-content;
	}
</style>
