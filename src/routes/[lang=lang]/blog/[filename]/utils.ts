import IconCopy from '@tabler/icons-svelte/IconCopy.svelte';
import IconCopyCheck from '@tabler/icons-svelte/IconCopyCheck.svelte';
import IconJson from '@tabler/icons-svelte/IconJson.svelte';
import IconBrandSvelte from '@tabler/icons-svelte/IconBrandSvelte.svelte';
import IconBrandTypescript from '@tabler/icons-svelte/IconBrandTypescript.svelte';
import IconBrandJavascript from '@tabler/icons-svelte/IconBrandJavascript.svelte';
import IconTxt from '@tabler/icons-svelte/IconTxt.svelte';
import IconTerminal2 from '@tabler/icons-svelte/IconTerminal2.svelte';
import IconLock from '@tabler/icons-svelte/IconLock.svelte';
import { addToast } from '$/lib/stores/toast';

export const customizeCodeBlocks = () => {
    const iconsMap: Record<string, typeof IconJson> = {
        bash: IconTerminal2,
        json: IconJson,
        svelte: IconBrandSvelte,
        ts: IconBrandTypescript,
        js: IconBrandJavascript,
        env: IconLock
    };

    document.querySelectorAll<HTMLDivElement>('div.custom-code-block').forEach((masterElement) => {
        // div.custom-code-block (masterElement)
        // |-- div.custom-data (headerElement)
        // |-- figure (figureElement)
        //     |-- pre (preElement)
        //     |   |-- code (codeElement)

        const headerElement = masterElement.querySelector('div.custom-data')!;
        const figureElement = masterElement.querySelector('figure')!;
        const titleElement = figureElement.querySelector('figcaption[data-rehype-pretty-code-title]');
        const preElement = figureElement.querySelector('pre')!;
        const codeElement = figureElement.querySelector('code')!;

        const metaElement = document.createElement('div');

        const language = preElement.getAttribute('data-language') ?? '';
        const Icon = iconsMap[language] ?? IconTxt;

        new Icon({ target: metaElement });

        const nameElement = document.createElement('span');
        nameElement.innerHTML = titleElement?.innerHTML ?? '';
        metaElement.appendChild(nameElement);

        headerElement.appendChild(metaElement);

        const copyElement = document.createElement('button');
        new IconCopy({ target: copyElement });
        headerElement.appendChild(copyElement);

        masterElement.classList.add('relative', 'w-full', 'overflow-hidden', 'flex', 'flex-col');
        headerElement.classList.add(
            'relative',
            'w-full',
            'h-[60px]',
            'px-5',
            'flex',
            'justify-between',
            'items-center',
            'bg-slate-200',
            'dark:bg-zinc-900',
            'rounded-t-lg'
        );
        metaElement.classList.add('relative', 'flex', 'gap-5', 'h-full', 'justify-between', 'items-center');
        nameElement.classList.add('text-sm');
        copyElement.classList.add(
            'relative',
            'h-10',
            'aspect-square',
            'rounded',
            'hover:bg-slate-300',
            'dark:hover:bg-zinc-800',
            'flex',
            'justify-center',
            'items-center',
            'duration-150'
        );

        titleElement?.remove();

        function removeHtmlTags(htmlString: string): string {
            return htmlString.replace(/<[^>]*>/g, '');
        }
        function replaceEntityWithSymbol(htmlString: string): string {
            return htmlString.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
        }
        copyElement.onclick = function () {
            navigator.clipboard.writeText(replaceEntityWithSymbol(removeHtmlTags(codeElement.innerHTML)));
            addToast({ type: 'success', message: 'Copied successfully.' });
            copyElement.innerHTML = '';
            new IconCopyCheck({ target: copyElement });
            setTimeout(() => {
                copyElement.innerHTML = '';
                new IconCopy({ target: copyElement });
            }, 2000);
        };
    });
}