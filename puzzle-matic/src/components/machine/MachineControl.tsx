"use client";

import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { GameContext } from "../game/GameProvider";
import { Puzzle } from "../game/GameData";

export default function MachineControl({
  puzzle,
  index,
  onSuccess,
  onFailure,
  firstUnsolved,
}: {
  puzzle: Puzzle;
  index: number;
  onSuccess: (index: number, puzzle: Puzzle) => void;
  onFailure: (index: number, puzzle: Puzzle) => void;
  firstUnsolved: number | null;
}) {
  const [answer, setAnswer] = useState("");

  const onAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const submitAnswer = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (answer.trim().localeCompare(puzzle.answer.trim(), undefined, { sensitivity: 'base' }) === 0) {
      onSuccess(index, puzzle);
    } else {
      onFailure(index, puzzle);
    }
  };

  return (
    <>
      {/* <Form.Group className="mb-1" controlId={`form-group-${puzzle.id}`}> */}
      <div style={{ padding: 5 }}>
        <b>{puzzle.title}</b>

        {puzzle.solved && (
          <>
            <Row>
              <Col>
              <b style={{color: 'green'}}>Solved!</b> {puzzle.answer}
              </Col>
            </Row>
          </>
        )}

        {index === firstUnsolved && (
          <>
            <Row>
              <Col xs="auto">
                <Form.Text className="text-muted">{puzzle.hint}</Form.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Answer"
                  value={answer}
                  onChange={onAnswerChange}
                />
              </Col>
              {/* </Form.Group> */}
              <Col xs="auto">
                <Button variant={puzzle.variant} type="submit" onClick={submitAnswer}>
                  Submit
                </Button>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
}
