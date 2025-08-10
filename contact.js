/*
 * Ventori Data Solutions Contact Page Logic
 *
 * This script powers the guided contact journey. Users select a
 * reason, choose detailed options, review a summary, and submit
 * their info. It manages step transitions and stores selections.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Step containers
  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const step3 = document.getElementById('step-3');
  const step4 = document.getElementById('step-4-success');
  const steps = { 1: step1, 2: step2, 3: step3, 4: step4 };

  const progressEl = document.getElementById('contact-progress');
  let currentStep = 1;

  function updateProgress() {
    if (currentStep <= 3) {
      progressEl.textContent = `Step ${currentStep} of 3`;
      progressEl.style.display = 'block';
    } else {
      progressEl.style.display = 'none';
    }
  }

  function showStep(stepNumber) {
    currentStep = stepNumber;
    Object.values(steps).forEach((step) => step.classList.remove('active'));
    if (steps[stepNumber]) steps[stepNumber].classList.add('active');
    updateProgress();
  }

  // Step 1: Reason selection
  const reasonCards = document.querySelectorAll('.reason-card');
  let selectedReason = null;
  const selectedDetails = {};

  reasonCards.forEach((card) => {
    card.addEventListener('click', () => {
      reasonCards.forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedReason = card.dataset.reason;
      selectedDetails[selectedReason] = {};
      loadStep2(selectedReason);
      showStep(2);
    });
  });

  // Step 2 elements
  const step2TitleEl = document.getElementById('step-2-title');
  const step2DescEl = document.getElementById('step-2-description');
  const step2ContentEl = document.getElementById('step-2-content');
  const backToStep1Btn = document.getElementById('back-to-step1');
  const toStep3Btn = document.getElementById('to-step3');

  backToStep1Btn.addEventListener('click', () => {
    showStep(1);
  });

  toStep3Btn.addEventListener('click', () => {
    buildSummary();
    showStep(3);
  });

  // Step 3 elements
  const summaryEl = document.getElementById('summary');
  const backToStep2Btn = document.getElementById('back-to-step2');
  backToStep2Btn.addEventListener('click', () => {
    showStep(2);
  });

  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showStep(4);
  });

  // Config per reason
  const reasonsConfig = {
    training: {
      title: 'Training Programs',
      description: 'Select the track, delivery mode, team size and timeline.',
      groups: [
        {
          name: 'track',
          label: 'Choose a track',
          options: [{ label: 'Beginner' }, { label: 'Intermediate' }, { label: 'Expert' }],
        },
        {
          name: 'delivery',
          label: 'Delivery mode',
          options: [{ label: 'On‑site' }, { label: 'Live online' }, { label: 'Self‑paced' }],
        },
        {
          name: 'teamSize',
          label: 'Team size',
          options: [{ label: '1–5' }, { label: '6–15' }, { label: '16–50' }, { label: '50+' }],
        },
        {
          name: 'timeline',
          label: 'Timeline',
          options: [{ label: 'ASAP' }, { label: '1–3 months' }, { label: '3–6 months' }, { label: '>6 months' }],
        },
      ],
    },
    workshops: {
      title: 'Workshops',
      description: 'Select a workshop topic, duration and custom data preference.',
      groups: [
        {
          name: 'topic',
          label: 'Workshop topic',
          options: [
            { label: 'RAG System' },
            { label: 'Workflow Automation Lab' },
            { label: 'Prompt Engineering' },
            { label: 'Ethics & Governance' },
          ],
        },
        {
          name: 'duration',
          label: 'Duration',
          options: [{ label: 'Half‑day' }, { label: '1 day' }, { label: '2 days' }],
        },
        {
          name: 'customData',
          label: 'Custom data?',
          options: [{ label: 'Yes' }, { label: 'No' }],
        },
      ],
    },
    implementation: {
      title: 'Implementation Services',
      description: 'Select the service, hosting, data sensitivity and budget band.',
      groups: [
        {
          name: 'serviceType',
          label: 'Service type',
          options: [
            { label: 'Custom RAG System' },
            { label: 'Workflow Automation' },
            { label: 'AI Content Engine' },
            { label: 'Custom Integration' },
          ],
        },
        {
          name: 'hosting',
          label: 'Hosting',
          options: [{ label: 'On‑prem' }, { label: 'Cloud' }, { label: 'Hybrid' }],
        },
        {
          name: 'dataSensitivity',
          label: 'Data sensitivity',
          options: [{ label: 'Standard' }, { label: 'Sensitive' }, { label: 'Regulated' }],
        },
        {
          name: 'budget',
          label: 'Budget band',
          options: [{ label: '<10k' }, { label: '10–40k' }, { label: '40–120k' }, { label: '120k+' }],
        },
      ],
    },
    consulting: {
      title: 'Consulting',
      description: 'Select your focus, engagement model and stakeholders.',
      groups: [
        {
          name: 'focus',
          label: 'Consulting focus',
          options: [
            { label: 'AI Readiness' },
            { label: 'AI Strategy & Roadmap' },
            { label: 'Change Management' },
            { label: 'Technology Advisory' },
          ],
        },
        {
          name: 'engagement',
          label: 'Engagement model',
          options: [{ label: 'One‑off' }, { label: 'Retainer (monthly)' }],
        },
        {
          name: 'stakeholders',
          label: 'Stakeholders',
          options: [{ label: 'Execs' }, { label: 'IT' }, { label: 'Ops' }, { label: 'Mixed' }],
        },
      ],
    },
    partnership: {
      title: 'Partnership',
      description: 'Select the type of partnership, region and timeline.',
      groups: [
        {
          name: 'partnershipType',
          label: 'Partnership type',
          options: [
            { label: 'Reseller' },
            { label: 'Tech Partner' },
            { label: 'Content/Education' },
            { label: 'Event/Speaking' },
          ],
        },
        {
          name: 'region',
          label: 'Preferred region',
          options: [{ label: 'North America' }, { label: 'Europe' }, { label: 'Asia‑Pacific' }, { label: 'Global' }],
        },
        {
          name: 'partnershipTimeline',
          label: 'Timeline',
          options: [{ label: 'Immediate' }, { label: 'Within 3 months' }, { label: '3–6 months' }],
        },
      ],
    },
    other: {
      title: 'Other',
      description: 'Let us know what you are looking for.',
      groups: [
        {
          name: 'intention',
          label: 'Intent',
          options: [{ label: 'Explore options' }, { label: 'Need advice' }, { label: 'Budget question' }],
        },
      ],
    },
  };

  // Render options for a reason
  function loadStep2(reason) {
    const config = reasonsConfig[reason];
    if (!config) return;
    step2TitleEl.textContent = config.title;
    step2DescEl.textContent = config.description;
    step2ContentEl.innerHTML = '';
    selectedDetails[reason] = {};

    config.groups.forEach((group) => {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'option-group';
      const groupTitle = document.createElement('h4');
      groupTitle.textContent = group.label;
      groupDiv.appendChild(groupTitle);
      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'options';
      group.options.forEach((opt) => {
        const value = opt.value || opt.label;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'option-button';
        btn.textContent = opt.label;
        btn.dataset.group = group.name;
        btn.dataset.value = value;
        btn.addEventListener('click', () => {
          optionsDiv.querySelectorAll('.option-button').forEach((b) => b.classList.remove('selected'));
          btn.classList.add('selected');
          selectedDetails[reason][group.name] = value;
          checkStep2Completion(reason);
        });
        optionsDiv.appendChild(btn);
      });
      groupDiv.appendChild(optionsDiv);
      step2ContentEl.appendChild(groupDiv);
    });

    // If 'other', add textarea
    if (reason === 'other') {
      const messageGroup = document.createElement('div');
      messageGroup.className = 'option-group';
      const label = document.createElement('h4');
      label.textContent = 'Tell us more (optional)';
      messageGroup.appendChild(label);
      const textarea = document.createElement('textarea');
      textarea.rows = 3;
      textarea.placeholder = 'Share any additional details...';
      textarea.style.width = '100%';
      textarea.addEventListener('input', () => {
        selectedDetails[reason].message = textarea.value.trim();
      });
      messageGroup.appendChild(textarea);
      step2ContentEl.appendChild(messageGroup);
    }

    toStep3Btn.disabled = true;
  }

  // Enable the Next button only when all groups have a selection
  function checkStep2Completion(reason) {
    const config = reasonsConfig[reason];
    const selections = selectedDetails[reason] || {};
    let complete = true;
    config.groups.forEach((group) => {
      if (!selections[group.name]) complete = false;
    });
    toStep3Btn.disabled = !complete;
  }

  // Build the summary in step 3
  function buildSummary() {
    summaryEl.innerHTML = '';
    if (!selectedReason) return;
    const config = reasonsConfig[selectedReason];
    const selections = selectedDetails[selectedReason] || {};
    const heading = document.createElement('h4');
    heading.textContent = `You selected: ${config.title}`;
    summaryEl.appendChild(heading);
    const list = document.createElement('ul');
    config.groups.forEach((group) => {
      const li = document.createElement('li');
      const value = selections[group.name];
      li.textContent = `${group.label}: ${value || '-'}`;
      list.appendChild(li);
    });
    if (selectedReason === 'other' && selections.message) {
      const li = document.createElement('li');
      li.textContent = `Details: ${selections.message}`;
      list.appendChild(li);
    }
    summaryEl.appendChild(list);
  }

  // Initialize
  updateProgress();
});
