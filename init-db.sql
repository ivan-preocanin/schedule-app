CREATE TABLE schedule (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id int,
    agent_id int,
    start_time TIMESTAMP,
    end_time TIMESTAMP
);

CREATE TYPE task_type AS ENUM ('break', 'work');

CREATE TABLE task (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id int,
    schedule_id uuid,
    start_time TIMESTAMP,
    duration int,
    type task_type,
    CONSTRAINT fk_schedule FOREIGN KEY(schedule_id) REFERENCES schedule(id)
);
