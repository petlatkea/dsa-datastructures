import SinglyLinkedList from "./singlylinkedlist.js";

function main() {
  // create list to be tested
  const list = new SinglyLinkedList();

  console.log("### SinglyLinkedList test ###");
  console.log("-----------------------------");
  // test is list is empty
  test("New list is empty", assert(null, list.head));

  test("size() - before adding", assert(0, list.size()));
  // add data
  list.add("T");
  test("add(data) - initial", assert("T", list.head.data));
  list.add("A");
  test("add(data) - second", assert("A", list.head.data));
  list.add("C");
  test("add(data) - third", assert("C", list.head.data));

  test("size() - after adding", assert(3, list.size()));

  console.log("-----------------------------");

  // get first
  test("getFirst()", assert("C", list.getFirst()));
  // get first Node
  test("getFirstNode()", assert("C", list.getFirstNode().data));
  // get last
  test("getLast()", assert("T", list.getLast()));
  // get last Node
  test("getLastNode()", assert("T", list.getLastNode().data));
  // get next node
  test("getNextNode(node)", assert("A", list.getNextNode(list.getFirstNode()).data));

  console.log("-----------------------------");

  test("getNodeWith(data) - first node", assert(list.getFirstNode(), list.getNodeWith("C")));
  test("getNodeWith(data) - middle node", assert(list.getNextNode(list.getFirstNode()), list.getNodeWith("A")));
  test("getNodeWith(data) - last node", assert(list.getLastNode(), list.getNodeWith("T")));

  console.log("-----------------------------");

  let node = list.getFirstNode();
  list.removeFirstNode();
  test("removeFirstNode()", assert("A", list.getFirst()));
  // re-add the node after removing
  list.add(node.data);

  node = list.getLastNode();
  list.removeLastNode();
  test("removeLastNode()", assert("A", list.getLast()));

  node = list.getFirstNode();
  let next = list.getNextNode(node);
  list.removeNode(node);
  test("removeNode(node)", assert(next, list.getFirstNode()));

  list.remove(next.data);
  test("remove(data)", assert(null, list.getFirstNode()));

  test("size() - after removing", assert(0, list.size()));

  // test list with only a single item in it.
  testsWithSingleItem();

  // test a completely empty list
  // stressTestEmptyList(); // comment this one in, when ready to really stresstest the list:
}

function testsWithSingleItem() {
  const list = new SinglyLinkedList();

  console.log("--------------------------");
  console.log(" TEST with single element ");
  console.log("--------------------------");

  // if a list only has a single item in it 
  // - all operations should target that item,
  //   no matter if they are first, last or
  //   specific to that node or data

  const data = "highlander";

  list.add(data);
  test("size()", assert(1, list.size()));
  test("getFirst()", assert(data, list.getFirst()));
  test("getLast()", assert(data, list.getLast()));
  
  let node = list.head;
  test("getFirstNode()", assert(node, list.getFirstNode()));
  test("getLastNode()", assert(node, list.getLastNode()));
  test("getNodeWith(data)", assert(node, list.getNodeWith(data)));

  test("getNextNode(node)", assertNull(list.getNextNode(node)));

  // test if removing first, removed last!
  list.removeFirstNode();
  test("removeFirstNode()", assertNull(list.getLastNode())); 
  list.add(data);

  // test if removing last, removed first!
  list.removeLastNode();
  test("removeLastNode()", assertNull(list.getFirstNode()));
  list.add(data);
  
  node = list.head;
  list.removeNode(node);
  test("removeNode(node)", assertNull(list.getFirstNode()));
  list.add(data);

  list.remove(data);
  test("remove(data)", assertNull(list.getFirstNode()));
}

function stressTestEmptyList() {
  const list = new SinglyLinkedList();

  console.log("-----------------------------");
  console.log(" STRESS TEST with empty list ");
  console.log("-----------------------------");

  list.add("s");
  list.add("t");
  list.add("u");
  list.add("f");
  list.add("f");

  let node = list.getFirstNode();

  let sizeBefore = list.size();
  test("size()", assertNot(0, sizeBefore));
  list.clear();
  let sizeAfter = list.size();
  test("clear()", assert(0, sizeAfter));

  test("getFirst() - empty list", assertNull(list.getFirst()));
  test("getLast() - empty list", assertNull(list.getLast()));
  test("getFirstNode() - empty list", assertNull(list.getFirstNode()));
  test("getLastNode() - empty list", assertNull(list.getLastNode()));
  test("getNextNode() - empty list", assertNull(list.getNextNode(node)));
  test("getNodeWith(data) - empty list", assertNull(list.getNextNode("NOTFOUND")));
  console.log("-----------------------------");

  test(
    "removeFirstNode() - empty list",
    assertNoException(() => list.removeFirstNode())
  );
  test(
    "removeLastNode() - empty list",
    assertNoException(() => list.removeLastNode())
  );
  test(
    "removeNode(node) - empty list",
    assertNoException(() => list.removeNode(node))
  );
  test(
    "remove(data) - empty list",
    assertNoException(() => list.remove("NOTFOUND"))
  );
}

/************************************
 Quick'n'dirty test-framework 
 - built to do this one thing,
   does the job, but only just ...
*************************************/
function test(name, assertion) {
  console.log((assertion.ok ? "✅" : "❌") + " " + name);
  if (!assertion.ok) {
    console.error("\x1b[33m   Expected:\x1b[0m", assertion.expected, "\x1b[33mbut got:\x1b[0m", assertion.actual);
  }
}

function assert(expected, actual) {
  return {
    ok: expected == actual,
    expected: expected,
    actual: actual,
  };
}

function assertNot(expected, actual) {
  return {
    ok: expected != actual,
    expected: expected,
    actual: actual,
  };
}

function assertNull(actual) {
  return {
    ok: actual == null,
    expected: null,
    actual: actual,
  };
}

function assertNoException(func) {
  let ok;
  try {
    func();
    return {
      ok: true,
      actual: "no-exception",
      expected: "no-exception",
    };
  } catch (exception) {
    return {
      ok: false,
      actual: exception,
      expected: "no-exception",
    };
  }
}

main();
