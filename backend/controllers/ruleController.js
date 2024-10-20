const Node = require('../models/Node');

// Helper function to parse comparisons like age > 30
const parseCondition = (token) => {
  const match = token.match(/([a-zA-Z_]+)([><=!]+)(\d+)/);
  if (match) {
    const [, field, operator, value] = match;
    return new Node({ nodeType: 'condition', value: { field, operator, value: Number(value) } });
  }
  return null;
};

const parseExpression = (tokens) => {
  const parse = () => {
    const token = tokens.shift();
    if (token === '(') {
      const left = parse();
      const operator = tokens.shift().toUpperCase();
      const right = parse();
      tokens.shift(); // Consume ')'
      return new Node({ nodeType: 'operator', left, right, value: operator });
    } else if (parseCondition(token)) {
      return parseCondition(token);
    } else if (!isNaN(Number(token))) {
      return new Node({ nodeType: 'operand', value: Number(token) });
    } else {
      return new Node({ nodeType: 'operand', value: token });
    }
  };
  return parse();
};

exports.createRule = async (req, res) => {
  try {
    const ruleString = req.body.rule;
    const tokens = ruleString.replace(/\(/g, '( ').replace(/\)/g, ' )').split(' ');
    const ast = parseExpression(tokens);
    await ast.save();
    res.status(201).json({ ruleId: ast._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.combineRules = async (req, res) => {
  try {
    const { rules } = req.body;
    let combinedRoot = await parseExpression(rules[0].replace(/\(/g, '( ').replace(/\)/g, ' )').split(' '));

    for (let i = 1; i < rules.length; i++) {
      const newRule = await parseExpression(rules[i].replace(/\(/g, '( ').replace(/\)/g, ' )').split(' '));
      combinedRoot = new Node({ nodeType: 'operator', left: combinedRoot, right: newRule, value: 'AND' });
      await combinedRoot.save();
    }

    res.status(201).json({ combinedRuleId: combinedRoot._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.evaluateRule = async (req, res) => {
  try {
    const { ruleId, data } = req.body;

    const evaluate = async (nodeId) => {
      const node = await Node.findById(nodeId).populate('left right').exec();
      if (!node) {
        throw new Error('Node not found');
      }

      if (node.nodeType === 'operand') {
        return data[node.value] || node.value; // Check if data has a key matching node.value
      } else if (node.nodeType === 'condition') {
        const { field, operator, value } = node.value;
        const dataValue = data[field];
        switch (operator) {
          case '>':
            return dataValue > value;
          case '<':
            return dataValue < value;
          case '==':
            return dataValue == value;
          default:
            return false;
        }
      } else if (node.nodeType === 'operator') {
        const leftValue = await evaluate(node.left);
        const rightValue = await evaluate(node.right);
        if (node.value === 'AND') {
          return leftValue && rightValue;
        } else if (node.value === 'OR') {
          return leftValue || rightValue;
        }
      }
      return false;
    };

    const result = await evaluate(ruleId);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
