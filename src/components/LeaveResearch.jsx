import { Thread, Finding, Check } from './thread/Thread.jsx';

/*
 * Research and spec for the leave demo: three findings, what each one put in
 * the data model, then the model itself.
 *
 * Why this figure and not a diagram of rules: the section's job is to show
 * that the records in the conversation above were chosen for reasons. Each
 * row is one reason. The last strip is the spec those reasons produced, and
 * its five records are the ones the thread reads. Scroll plays the rows in
 * order and unplays them on the way back, like the thread.
 *
 * No tone colours: nothing here is a message, a block or a result.
 */
export default function LeaveResearch() {
  return (
    <Thread wide caption="The five records are the demo’s data model. Balances, dates and policy values elsewhere on this page are fictional.">
      <Finding
        index={0}
        source="Self-service workflows"
        chips={[
          { k: 'Check', v: 'Runs before the write' },
          { k: 'Request', v: 'A draft until confirmed' },
        ]}
      >
        The workflows I reviewed collect a leave request and pass it on.
        Whether it fits policy is settled later.
      </Finding>

      <Finding
        index={1}
        source="Leave policies"
        chips={[
          { k: 'Holiday', v: 'A record of its own' },
          { k: 'Working days', v: 'Calculated', note: 'never asked for' },
        ]}
      >
        Policies count working days. “Two weeks” means nothing to a rule until
        weekends and holidays are taken out.
      </Finding>

      <Finding
        index={2}
        source="Policies across employment types"
        chips={[
          { k: 'Policy', v: 'A record the employee points to' },
          { k: 'Rules', v: '8, written once', note: 'not 8 for each of 6 policies' },
        ]}
      >
        Balance rules differ by employment type and location, so the same
        request can pass for one employee and fail for another.
      </Finding>

      <Check
        index={3}
        label="The data model the conversation reads"
        cells={[
          { k: 'Record', v: 'Employee', note: 'who is asking; points to one policy' },
          { k: 'Record', v: 'Balance', note: 'days available, by leave type' },
          { k: 'Record', v: 'Policy', note: 'the limits for this employee' },
          { k: 'Record', v: 'Request', note: 'the draft, then what is submitted' },
          { k: 'Record', v: 'Holiday', note: 'days that don’t count' },
        ]}
      />
    </Thread>
  );
}
