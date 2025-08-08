export interface ParsedResume {
    name: string;
    title: string;
    contact: {
        email: string;
        phone: string;
        linkedin: string;
        location: string;
    };
    summary: string;
    experience: {
        title: string;
        company: string;
        date: string;
        duties: string[];
    }[];
    education: {
        degree: string;
        university: string;
        date: string;
    }[];
    skills: string[];
}

export const parseResumeHtml = (html: string): ParsedResume => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.innerText;

    const result: ParsedResume = {
        name: tempDiv.querySelector('p:first-of-type strong')?.textContent || 'Your Name',
        title: tempDiv.querySelector('p:nth-of-type(1)')?.innerText.split('|')[0].replace(tempDiv.querySelector('p:first-of-type strong')?.textContent || '', '').trim() || 'Professional Title',
        contact: {
            email: text.match(/[\w.-]+@[\w.-]+\.\w+/)?.[0] || '',
            phone: text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)?.[0] || '',
            linkedin: text.match(/linkedin\.com\/in\/[\w-]+/)?.[0] || '',
            location: text.match(/(\w+,\s\w+,\s\w+)|(\w+,\s\w+)/)?.[0] || '',
        },
        summary: '',
        experience: [],
        education: [],
        skills: [],
    };

    const sections = html.split(/<p><strong>(.*?)<\/strong><\/p>/i).slice(1);

    for (let i = 0; i < sections.length; i += 2) {
        const sectionTitle = sections[i].toLowerCase();
        const sectionContent = sections[i + 1];

        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = sectionContent;

        if (sectionTitle.includes('summary')) {
            result.summary = contentDiv.querySelector('p')?.innerText || '';
        } else if (sectionTitle.includes('skills')) {
            result.skills = Array.from(contentDiv.querySelectorAll('li')).map(li => li.innerText.trim());
        } else if (sectionTitle.includes('experience')) {
            const listItems = Array.from(contentDiv.querySelectorAll('ul > li'));
            listItems.forEach(li => {
                const mainText = li.childNodes[0]?.textContent?.split('|').map(s => s.trim()) || [];
                if (mainText.length >= 1) { // More forgiving check
                    const experienceItem = {
                        title: mainText[0] || 'Job Title',
                        company: mainText[1] || 'Company',
                        date: mainText[2] || 'Date',
                        duties: Array.from(li.querySelectorAll('ul li')).map(duty => duty.innerText.trim()),
                    };
                    result.experience.push(experienceItem);
                }
            });
        } else if (sectionTitle.includes('education')) {
            const listItems = Array.from(contentDiv.querySelectorAll('ul > li'));
            listItems.forEach(li => {
                const mainText = li.textContent?.split('|').map(s => s.trim()) || [];
                if (mainText.length >= 1) { // More forgiving check
                    result.education.push({
                        degree: mainText[0] || 'Degree',
                        university: mainText[1] || 'University',
                        date: mainText[2] || 'Date',
                    });
                }
            });
        }
    }

    return result;
};