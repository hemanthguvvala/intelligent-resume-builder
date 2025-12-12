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

const sectionAliases = {
    summary: ['summary', 'profile', 'objective'],
    experience: ['experience', 'work history', 'professional experience', 'employment'],
    education: ['education', 'academic background'],
    skills: ['skills', 'core competencies', 'technologies', 'technical skills'],
};

export const parseResumeHtml = (html: string): ParsedResume => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const result: ParsedResume = {
        name: tempDiv.querySelector('h1')?.textContent || tempDiv.querySelector('p strong')?.textContent || 'Your Name',
        title: tempDiv.querySelector('h2')?.textContent || '',
        contact: {
            email: html.match(/[\w.-]+@[\w.-]+\.\w+/)?.[0] || '',
            phone: html.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)?.[0] || '',
            linkedin: html.match(/linkedin\.com\/in\/[\w-]+/)?.[0] || '',
            location: '', // Location is harder to parse reliably without NLP
        },
        summary: '',
        experience: [],
        education: [],
        skills: [],
    };

    // Find contact line
    Array.from(tempDiv.querySelectorAll('p')).find(p => {
        if (p.innerText.includes(result.contact.email)) {
            result.contact.location = p.innerText.split(/\|/g)[0].trim();
        }
    });


    let currentSection: keyof typeof sectionAliases | null = null;
    const children = Array.from(tempDiv.children);

    children.forEach(el => {
        const text = el.textContent?.trim().toLowerCase() || '';
        let isHeader = false;
        for (const key in sectionAliases) {
            if (sectionAliases[key as keyof typeof sectionAliases].includes(text)) {
                currentSection = key as keyof typeof sectionAliases;
                isHeader = true;
                break;
            }
        }
        if (isHeader) return;

        if (currentSection) {
            switch (currentSection) {
                case 'summary':
                    if (el.tagName === 'P') result.summary += el.textContent + ' ';
                    break;
                case 'skills':
                    if (el.tagName === 'UL') {
                        result.skills.push(...Array.from(el.querySelectorAll('li')).map(li => li.textContent || ''));
                    }
                    break;
                case 'education':
                    if (el.tagName === 'UL') {
                        Array.from(el.querySelectorAll('li')).forEach(li => {
                            const [degree, university, date] = (li.textContent || '').split(/\||–/).map(s => s.trim());
                            if (degree && university) result.education.push({ degree, university, date: date || '' });
                        });
                    }
                    break;
                case 'experience':
                    if (el.tagName === 'UL') {
                        Array.from(el.querySelectorAll(':scope > li')).forEach(li => {
                            const mainText = li.childNodes[0]?.textContent || '';
                            const [title, company, date] = mainText.split(/\||@|–/).map(s => s.trim());
                            const duties = Array.from(li.querySelectorAll('ul li')).map(duty => duty.textContent || '');
                            if (title && company) result.experience.push({ title, company, date: date || '', duties });
                        });
                    }
                    break;
            }
        }
    });

    result.summary = result.summary.trim();
    return result;
};