import { useState } from 'react'
import {
  Button, Callout, CodeBlock, DataTable, EmptyState, Eyebrow, Field, Frame, Header, Meter, Panel, Section,
  Segmented, Stat, StatRow, StickyBanner, Stepper, Tag, ThemeToggle, scoreTone, useTheme,
} from './kit'

const ROWS = [
  { id: 'a', name: 'meeting_id', type: 'uuid', score: 0.1 },
  { id: 'b', name: 'faculty_email', type: 'varchar', score: 0.97 },
  { id: 'c', name: 'decision_text', type: 'text', score: 0.62 },
]

const SWATCHES = ['background', 'card', 'muted', 'border', 'accent', 'ok', 'warn', 'bad', 'info']

export default function App() {
  const { dark, toggle } = useTheme()
  const [seg, setSeg] = useState('Overview')
  const [step, setStep] = useState(1)
  const [banner, setBanner] = useState(true)

  return (
    <div className="min-h-screen pb-20">
      <Header
        logo={<span className="font-mono text-sm font-semibold tracking-[0.2em]">UI KIT</span>}
        actions={
          <>
            <ThemeToggle dark={dark} onToggle={toggle} />
            <Button>Primary</Button>
          </>
        }
      />

      <section className="dashed-b relative overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <Frame className="relative py-20">
          <Eyebrow>00 / Design system</Eyebrow>
          <h1 className="rise mt-6 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            Hairlines, mono labels, <span className="text-accent">one accent</span>.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            A reusable UI/UX kit for technical, proof-first products. Copy <code className="font-mono text-foreground">src/kit</code> into any Vite + Tailwind v4 project. See README.md for setup and principles.
          </p>
        </Frame>
      </section>

      <Section n="01" label="Tokens" title="Color and type.">
        <div className="grid grid-cols-3 gap-3 md:grid-cols-9">
          {SWATCHES.map((s) => (
            <div key={s} className="overflow-hidden rounded-sm border border-border">
              <div className="h-14" style={{ background: `var(--${s})` }} />
              <div className="bg-card px-2 py-1.5 font-mono text-[11px]">{s}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <Panel title="Inter · sans"><p className="p-4 text-2xl font-medium tracking-tight">Where ideas turn into real software.</p></Panel>
          <Panel title="Geist Mono · labels"><p className="p-4 font-mono text-lg">03 / HACKATHONS · 0.92</p></Panel>
        </div>
      </Section>

      <Section n="02" label="Controls" title="Buttons, tags, inputs.">
        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Actions">
            <div className="space-y-4 p-4">
              <div className="flex flex-wrap gap-2"><Button>Primary</Button><Button variant="ghost">Ghost</Button><Button disabled>Disabled</Button></div>
              <div className="flex flex-wrap gap-2">
                <Tag>neutral</Tag><Tag tone="accent">accent</Tag><Tag tone="ok">ok</Tag><Tag tone="warn">warn</Tag><Tag tone="bad">bad</Tag><Tag tone="info">info</Tag>
              </div>
              <Segmented label="Demo" options={['Overview', 'Details', 'History'] as const} value={seg as 'Overview'} onChange={setSeg} />
            </div>
          </Panel>
          <Panel title="Form">
            <div className="space-y-4 p-4">
              <Field label="Host" defaultValue="db.example.edu" hint="Stored encrypted" />
              <Field label="Password" type="password" defaultValue="secret" />
            </div>
          </Panel>
        </div>
      </Section>

      <Section n="03" label="Data" title="Stats, meters, tables, steps.">
        <StatRow>
          <Stat k="Members" v="200K+" />
          <Stat k="Countries" v="40+" />
          <Stat k="Latency" v="~300ms" sub="per query" />
          <Stat k="Quality" v="78%" />
        </StatRow>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <DataTable
            rows={ROWS}
            rowKey={(r) => r.id}
            columns={[
              { key: 'n', header: 'Column', render: (r) => <span className="font-mono text-[13px]">{r.name}</span> },
              { key: 't', header: 'Type', render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.type}</span> },
              { key: 's', header: 'Score', className: 'w-48', render: (r) => (
                <div className="flex items-center gap-3"><Meter value={r.score} tone={r.score > 0.8 ? 'bad' : scoreTone(1 - r.score)} /><span className="font-mono text-xs">{r.score.toFixed(2)}</span></div>
              ) },
            ]}
          />
          <Panel title="Stepper">
            <Stepper
              current={step}
              onSelect={setStep}
              steps={[{ title: 'Connect', detail: 'Encrypt credentials' }, { title: 'Discover', detail: 'Read schema only' }, { title: 'Extract' }]}
            />
          </Panel>
        </div>
      </Section>

      <Section n="04" label="Feedback" title="Callouts, code, empty states.">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-3">
            <Callout tone="ok" title="Verified">Deletion complete, 0 residuals.</Callout>
            <Callout tone="warn" title="Weakest link">Assumption confidence 0.65.</Callout>
            <Callout tone="bad" title="Conflict">Two decisions contradict.</Callout>
          </div>
          <CodeBlock title="Usage">{`import { Section, Panel } from './kit'\n\n<Section n="01" label="Impact" title="..." />`}</CodeBlock>
          <Panel><EmptyState title="Nothing yet">Run an action to see results here.</EmptyState></Panel>
        </div>
      </Section>

      {banner && (
        <StickyBanner action={<Button>Action</Button>} onDismiss={() => setBanner(false)}>
          <span className="font-mono text-xs text-muted-foreground">STICKY · </span>Persistent call to action
        </StickyBanner>
      )}
    </div>
  )
}
