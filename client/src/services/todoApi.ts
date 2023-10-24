export async function createTodo(title: string) {
  try {
    const res = await fetch('/server/v1/api/todo', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function updateTodo(
  id: string,
  updateTodo: { title?: string; completed?: boolean }
) {
  try {
    const res = await fetch(`/server/v1/api/todo/${id}`, {
      method: 'PATCH',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(updateTodo),
    });
    if (res.status === 200) {
      return { updated: true };
    }
    return { updated: false };
  } catch (error) {
    return { updated: false };
  }
}

export async function deleteTodo(id: string) {
  try {
    const res = await fetch(`/server/v1/api/todo/${id}`, {
      method: 'DELETE',
    });
    if (res.status === 200) {
      return { deleted: true };
    }
    return { deleted: false };
  } catch (error) {
    return { deleted: false };
  }
}
